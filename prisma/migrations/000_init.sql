-- Baseline migration for initial models

CREATE TYPE "ItemCategory" AS ENUM ('RESOURCE', 'SHIP', 'GENERAL');

CREATE TABLE "Player" (
  "id" TEXT PRIMARY KEY NOT NULL,
  "discordId" TEXT NOT NULL UNIQUE,
  "name" TEXT NOT NULL,
  "bio" TEXT,
  "gold" INTEGER NOT NULL DEFAULT 100000,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Item" (
  "id" TEXT PRIMARY KEY NOT NULL,
  "key" TEXT NOT NULL UNIQUE,
  "name" TEXT NOT NULL,
  "category" "ItemCategory" NOT NULL,
  "stackable" BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE "Inventory" (
  "id" TEXT PRIMARY KEY NOT NULL,
  "playerId" TEXT NOT NULL,
  "itemId" TEXT NOT NULL,
  "quantity" INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT "Inventory_playerId_itemId_key" UNIQUE ("playerId", "itemId"),
  CONSTRAINT "Inventory_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT "Inventory_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

