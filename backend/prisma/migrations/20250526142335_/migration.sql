/*
  Warnings:

  - You are about to drop the column `logo` on the `TokenTransfer` table. All the data in the column will be lost.
  - Added the required column `logoUrl` to the `TokenTransfer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TokenTransfer" DROP COLUMN "logo",
ADD COLUMN     "logoUrl" TEXT NOT NULL;
