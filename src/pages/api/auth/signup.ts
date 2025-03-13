import { NextApiRequest, NextApiResponse } from "next";
import { createUser } from "@/lib/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await createUser({ name, email, password });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ message: (error as Error).message || "Registration failed" });
  }
}
