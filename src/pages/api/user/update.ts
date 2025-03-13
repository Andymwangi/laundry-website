// src/pages/api/users/update.ts (new file)
import { NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

const secretKey = process.env.JWT_SECRET || 'your-secret-key';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get the token from cookies
    const token = req.cookies['auth-token'];
    if (!token) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    // Verify the token
    const decoded = verify(token, secretKey) as { userId: number };
    const userId = decoded.userId;

    // Get user data from request body (allow updating name and email)
    const { name, email } = req.body;
    
    // Update the user data
    const updatedUser = await db.update(users)
      .set({ 
        name: name !== undefined ? name : undefined,
        email: email !== undefined ? email : undefined,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();
    
    if (!updatedUser.length) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return the updated user without sensitive information
    return res.status(200).json({
      success: true,
      user: {
        id: updatedUser[0].id,
        name: updatedUser[0].name,
        email: updatedUser[0].email,
      }
    });
  } catch (error) {
    console.error('Update user error:', error);
    return res.status(401).json({ error: 'Invalid token' });
  }
}