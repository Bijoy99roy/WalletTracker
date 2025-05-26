/*
  Warnings:

  - Added the required column `logo` to the `TokenTransfer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fees` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TokenTransfer" ADD COLUMN     "logo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "fees" INTEGER NOT NULL;
