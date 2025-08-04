-- Baseline migration for initial models

CREATE TABLE "Character" (
  "id" TEXT PRIMARY KEY NOT NULL,
  "name" TEXT NOT NULL
);

CREATE TABLE "Wallet" (
  "id" TEXT PRIMARY KEY NOT NULL,
  "balance" INTEGER NOT NULL
);

CREATE TABLE "Listing" (
  "id" TEXT PRIMARY KEY NOT NULL,
  "title" TEXT NOT NULL,
  "price" INTEGER NOT NULL
);

CREATE TABLE "Technology" (
  "id" TEXT PRIMARY KEY NOT NULL,
  "name" TEXT NOT NULL
);
