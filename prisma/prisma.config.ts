// Load environment variables from .env (default for Prisma CLI)
import { config } from "dotenv";
config({ path: ".env" });

import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "./prisma/schema.prisma",
  datasource: {
    // provider stays only in schema.prisma – do NOT add it here
    url: env("DATABASE_URL"), // required format for Prisma 7 CLI
  },
});
