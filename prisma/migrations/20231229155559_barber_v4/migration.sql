/*
  Warnings:

  - You are about to drop the column `sub` on the `Adm` table. All the data in the column will be lost.
  - You are about to drop the column `sub` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Adm` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Adm" DROP COLUMN "sub";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "sub";

-- CreateIndex
CREATE UNIQUE INDEX "Adm_email_key" ON "Adm"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
