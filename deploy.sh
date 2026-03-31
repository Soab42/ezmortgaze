#!/bin/bash

# 1. Update code from GitHub
git pull origin main

# 2. Link the shared environment file from the VPS shared folder
# This ensures DATABASE_URL is available for Prisma and Next.js
ln -sf ../../shared/.env .env

# 3. Install dependencies
pnpm install

# 4. Generate Prisma Client
npx prisma generate

# 5. Deploy Database Migrations (Pre-build command)
# This ensures your production database schema is up-to-date
npx prisma migrate deploy

# 6. Build the Next.js application
pnpm run build

echo "🚀 Application deployed successfully!"
