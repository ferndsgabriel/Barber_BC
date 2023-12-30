/*
  Warnings:

  - A unique constraint covering the columns `[sub]` on the table `Adm` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sub]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Adm_sub_key" ON "Adm"("sub");

-- CreateIndex
CREATE UNIQUE INDEX "User_sub_key" ON "User"("sub");
