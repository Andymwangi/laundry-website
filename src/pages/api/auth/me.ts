import { NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';
import { db } from '@/lib/db';
import { users, profiles } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

const secretKey = process.env.JWT_SECRET || 'your-secret-key';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const token = req.cookies['auth-token'];
    
    if (!token) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    
    const decoded = verify(token, secretKey) as { userId: number };
    const userId = decoded.userId;
    
    // Get user data
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Get profile data
    const profile = await db.query.profiles.findFirst({
      where: eq(profiles.userId, userId),
    });
    
    // Return the user and profile data (if it exists)
    return res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        profile: profile || undefined
      },
    });
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}