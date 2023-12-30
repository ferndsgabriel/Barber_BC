/*
  Warnings:

  - Added the required column `sub` to the `Adm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sub` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Adm" ADD COLUMN     "sub" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "sub" TEXT NOT NULL;
