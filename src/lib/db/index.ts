import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

// Get the connection string from environment variables
const connectionString = process.env.DATABASE_URL!;

// Create a Neon client with the connection string
const sql = neon(connectionString);

// Create a Drizzle client with the schema
export const db = drizzle(sql, { schema });