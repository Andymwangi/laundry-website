import { cookies } from "next/headers";
import { compare, hash } from "bcrypt";
import { SignJWT, jwtVerify } from "jose";
import { db } from "./db";
import { users, NewUser } from "./db/schema";
import { eq } from "drizzle-orm";

const secretKey = process.env.JWT_SECRET || "your-secret-key";
const key = new TextEncoder().encode(secretKey);

export async function createUser(userData: Omit<NewUser, "id" | "createdAt" | "updatedAt">) {
  // Check if user already exists
  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, userData.email),
  });

  if (existingUser) {
    throw new Error("User with this email already exists");
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

export async function signInWithEmailAndPassword(email: string, password: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!user) {
    throw new Error("User not found");
  }

  const passwordMatch = await compare(password, user.password);

  if (!passwordMatch) {
    throw new Error("Invalid password");
  }

  // Create and set the JWT token
  const token = await new SignJWT({ userId: user.id })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);

  cookies().set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  return { id: user.id, name: user.name, email: user.email };
}

export async function getUserFromToken() {
  const token = cookies().get("auth-token")?.value;

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

export async function signOut() {
  cookies().delete("auth-token");
}

