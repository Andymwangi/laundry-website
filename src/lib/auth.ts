import cookie from "cookie";
import { compare, hash } from "bcrypt";
import { SignJWT, jwtVerify } from "jose";
import { db } from "./db";
import { users, NewUser } from "./db/schema";
import { eq } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";

const secretKey = process.env.JWT_SECRET || "your-secret-key";
const key = new TextEncoder().encode(secretKey);

// Define expected request body types
interface AuthRequestBody {
  email: string;
  password: string;
}

// Create a new user
export async function createUser(userData: Omit<NewUser, "id" | "createdAt" | "updatedAt">) {
  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, userData.email),
  });

  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const hashedPassword = await hash(userData.password, 10);

  const newUser = await db.insert(users).values({
    name: userData.name,
    email: userData.email,
    password: hashedPassword,
  }).returning();

  return newUser[0];
}

// Handle sign-in and set cookie in API route
export async function signInWithEmailAndPassword(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email, password } = req.body as AuthRequestBody;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Create JWT token
    const token = await new SignJWT({ userId: user.id })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(key);

    // Set HTTP-only cookie
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("auth-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      })
    );

    return res.status(200).json({ id: user.id, name: user.name, email: user.email });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Get user from token (API route)
export async function getUserFromToken(req: NextApiRequest) {
  const cookies = cookie.parse(req.headers.cookie || "");
  const token = cookies["auth-token"];

  if (!token) return null;

  try {
    const verified = await jwtVerify(token, key);
    const userId = verified.payload.userId as number;

    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    if (!user) return null;

    return { id: user.id, name: user.name, email: user.email };
  } catch (error) {
    return null;
  }
}

// Sign out function (API route)
export async function signOut(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("auth-token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(0),
      path: "/",
    })
  );

  return res.status(200).json({ message: "Signed out successfully" });
}