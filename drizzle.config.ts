import type { Config } from "drizzle-kit";
import "dotenv/config"; // Load environment variables

export default {
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql", // Correct dialect for PostgreSQL
  dbCredentials: {
    url: process.env.DATABASE_URL!, // Use environment variable
  },
  breakpoints: true, // Optional, for better migration tracking
} satisfies Config;
