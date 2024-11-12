/*
  Warnings:

  - You are about to drop the column `updaatedAt` on the `Vendor` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Vendor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vendor" DROP COLUMN "updaatedAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
