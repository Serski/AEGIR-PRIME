import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function run() {
  console.log('Prisma seed not implemented yet');
  await prisma.$disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
