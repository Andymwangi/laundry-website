import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

// Load environment variables from .env.local file
dotenv.config({ path: '.env.local' });

// Ensure DATABASE_URL is available
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("DATABASE_URL is not defined in environment variables");
  process.exit(1);
}

export default {
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql", // Correct dialect for PostgreSQL
  dbCredentials: {
    url: databaseUrl,
  },
  breakpoints: true, // Optional, for better migration tracking
} satisfies Config;
