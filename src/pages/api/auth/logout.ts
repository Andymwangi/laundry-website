import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  // Clear the cookie
  res.setHeader(
    'Set-Cookie',
    serialize('auth-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: -1, // Expired
      path: '/',
      sameSite: 'strict',
    })
  );
  
  return res.status(200).json({ success: true });
}