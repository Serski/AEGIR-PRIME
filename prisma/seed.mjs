import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

try {
  await prisma.$connect();
  console.log('Seed: no-op (placeholder)');
} finally {
  await prisma.$disconnect();
}

