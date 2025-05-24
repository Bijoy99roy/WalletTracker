/*
  Warnings:

  - You are about to drop the column `currentPrice` on the `TokenTransfer` table. All the data in the column will be lost.
  - You are about to drop the column `priceAtTx` on the `TokenTransfer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TokenTransfer" DROP COLUMN "currentPrice",
DROP COLUMN "priceAtTx";
