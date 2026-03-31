import "dotenv/config";
import { defineConfig, env } from "prisma/config";
// Add this log
console.log("🛠️  Build Check: DATABASE_URL is", process.env.DATABASE_URL ? "SET" : "NOT SET");
export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
