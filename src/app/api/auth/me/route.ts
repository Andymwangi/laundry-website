import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    // Get token from cookies
    const token = cookies().get('auth_token')?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Verify token
    let decoded;
    try {
      decoded = verify(token, process.env.JWT_SECRET || 'fallback_secret');
    } catch (error) {
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401 }
      );
    }

    // Get user data from database
    const userResult = await db.select({
      id: users.id,
      name: users.name,
      email: users.email,
      createdAt: users.createdAt
    })
    .from(users)
    .where(eq(users.id, decoded.id))
    .limit(1);

    const user = userResult[0];

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { success: false, message: 'Authentication error' },
      { status: 500 }
    );
  }
} 