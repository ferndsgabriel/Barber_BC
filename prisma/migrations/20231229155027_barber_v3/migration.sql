/*
  Warnings:

  - You are about to drop the column `phone` on the `Adm` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Adm" DROP COLUMN "phone";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "phone";
