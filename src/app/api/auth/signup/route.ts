import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, NewUser } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // Basic validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await db.select().from(users).where(eq(users.email, email.toLowerCase())).limit(1);
    
    if (existingUser.length > 0) {
      return NextResponse.json(
        { success: false, message: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create user
    const newUser = await db.insert(users).values({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    }).returning();

    const user = newUser[0];

    // Generate JWT token
    const token = sign(
      {
        id: user.id,
        email: user.email,
        name: user.name
      },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    );

    // Set cookie
    cookies().set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    // Return user info (excluding password)
    return NextResponse.json({
      success: true,
      message: 'Signup successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred during signup' },
      { status: 500 }
    );
  }
} 