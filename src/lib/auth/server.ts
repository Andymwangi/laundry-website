import { cookies } from 'next/headers';
import { compare, hash } from 'bcrypt';
import { SignJWT, jwtVerify } from 'jose';
import { db } from '../db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import { User, NewUser } from './types';

const secretKey = process.env.JWT_SECRET || 'your-secret-key';
const key = new TextEncoder().encode(secretKey);

export async function createUserServer(userData: Omit<NewUser, 'id' | 'createdAt' | 'updatedAt'>) {
  // Check if user already exists
  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, userData.email),
  });
  
  if (existingUser) {
    throw new Error('User with this email already exists');
  }
  
  // Hash the password
  const hashedPassword = await hash(userData.password, 10);
  
  // Create the user
  const newUser = await db.insert(users).values({
    name: userData.name,
    email: userData.email,
    password: hashedPassword,
  }).returning();
  
  return newUser[0];
}

export async function signInServer(email: string, password: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });
  
  if (!user) {
    throw new Error('User not found');
  }
  
  const passwordMatch = await compare(password, user.password);
  
  if (!passwordMatch) {
    throw new Error('Invalid password');
  }
  
  // Create JWT token
  const token = await new SignJWT({ userId: user.id })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(key);
  
  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
}

export async function getUserFromTokenServer() {
  const cookieStore = cookies();
  const token = cookieStore.get('auth-token')?.value;
  
  if (!token) {
    return null;
  }
  
  try {
    const verified = await jwtVerify(token, key);
    const userId = verified.payload.userId as number;
    
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });
    
    if (!user) {
      return null;
    }
    
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  } catch (error) {
    return null;
  }
}