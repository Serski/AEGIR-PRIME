# Prisma Setup

This directory contains the Prisma schema and database migrations.

## Running Migrations

1. Ensure the `DATABASE_URL` environment variable is set in your `.env` file.
2. Apply migrations in development:
   ```bash
   npx prisma migrate dev
   ```
3. For production, use:
   ```bash
   npx prisma migrate deploy
   ```
4. Generate the Prisma client after running migrations:
   ```bash
   npx prisma generate
   ```
