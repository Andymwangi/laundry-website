import { NextApiRequest, NextApiResponse } from 'next';
import { signInServer } from '@/lib/auth/server';
import { serialize } from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;
    const { token, user } = await signInServer(email, password);
    
    // Set the cookie
    res.setHeader(
      'Set-Cookie',
      serialize('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
        sameSite: 'strict',
      })
    );
    
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: error instanceof Error ? error.message : 'Authentication failed',
    });
  }
}