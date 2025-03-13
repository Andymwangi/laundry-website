import { NextApiRequest, NextApiResponse } from "next";
import { signInWithEmailAndPassword } from "@/lib/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await signInWithEmailAndPassword(email, password);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(401).json({ message: (error as Error).message || "Authentication failed" });
  }
}
