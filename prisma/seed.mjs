import { PrismaClient, ItemCategory } from '@prisma/client';

const prisma = new PrismaClient();

const items = [
  { key: 'afm', name: 'Alloy Frame Modules', category: ItemCategory.RESOURCE },
  { key: 'pcc', name: 'Plasma Core Cells', category: ItemCategory.RESOURCE },
  { key: 'oop', name: 'Oblivion Ore Plates', category: ItemCategory.RESOURCE },
  { key: 'ggp', name: 'Graveglass Panels', category: ItemCategory.RESOURCE },
  { key: 'qfr', name: 'Quantum Flux Regulators', category: ItemCategory.RESOURCE },
  { key: 'ncm', name: 'Neural Command Matrices', category: ItemCategory.RESOURCE },
  { key: 'corvette', name: 'Corvette', category: ItemCategory.SHIP, stackable: false },
  { key: 'destroyer', name: 'Destroyer', category: ItemCategory.SHIP, stackable: false },
  { key: 'heavy_frigate', name: 'Heavy Frigate', category: ItemCategory.SHIP, stackable: false },
  { key: 'cruiser', name: 'Cruiser', category: ItemCategory.SHIP, stackable: false }
];

try {
  for (const data of items) {
    await prisma.item.upsert({
      where: { key: data.key },
      update: {},
      create: data
    });
  }
} catch (e) {
  console.error(e);
  process.exit(1);
} finally {
  await prisma.$disconnect();
}

