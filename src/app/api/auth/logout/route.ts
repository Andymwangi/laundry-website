import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST() {
  // Clear the auth cookie
  cookies().set({
    name: 'auth_token',
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0, // Expire immediately
  });

  return NextResponse.json({
    success: true,
    message: 'Logged out successfully'
  });
} 