import { NextApiRequest, NextApiResponse } from 'next';
import { createUserServer } from '@/lib/auth/server';
import { NewUser } from '@/lib/auth/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const userData = req.body as NewUser;
    const user = await createUserServer(userData);
    
    return res.status(201).json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    });
  }
}