// src/pages/api/profiles/update.ts (new file)
import { NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';
import { db } from '@/lib/db';
import { profiles } from '@/lib/db/schema';
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

    // Get profile fields from request body
    const { 
      phoneNumber, 
      address, 
      apartment, 
      city, 
      postalCode, 
      defaultPickupInstructions 
    } = req.body;
    
    // Check if profile exists
    const existingProfile = await db.query.profiles.findFirst({
      where: eq(profiles.userId, userId),
    });

    let updatedProfile;
    
    if (existingProfile) {
      // Update existing profile
      updatedProfile = await db.update(profiles)
        .set({
          phoneNumber: phoneNumber !== undefined ? phoneNumber : undefined,
          address: address !== undefined ? address : undefined,
          apartment: apartment !== undefined ? apartment : undefined,
          city: city !== undefined ? city : undefined,
          postalCode: postalCode !== undefined ? postalCode : undefined,
          defaultPickupInstructions: defaultPickupInstructions !== undefined ? defaultPickupInstructions : undefined,
          updatedAt: new Date(),
        })
        .where(eq(profiles.userId, userId))
        .returning();
    } else {
      // Create new profile
      updatedProfile = await db.insert(profiles)
        .values({
          userId,
          phoneNumber,
          address,
          apartment,
          city,
          postalCode,
          defaultPickupInstructions,
        })
        .returning();
    }

    return res.status(200).json({
      success: true,
      profile: updatedProfile[0],
    });
  } catch (error) {
    console.error('Update profile error:', error);
    return res.status(401).json({ error: 'Invalid token' });
  }
}