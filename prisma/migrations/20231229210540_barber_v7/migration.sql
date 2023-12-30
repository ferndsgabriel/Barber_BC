/*
  Warnings:

  - You are about to drop the column `photo` on the `Adm` table. All the data in the column will be lost.
  - You are about to drop the column `sub` on the `Adm` table. All the data in the column will be lost.
  - Added the required column `pass` to the `Adm` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Adm_sub_key";

-- AlterTable
ALTER TABLE "Adm" DROP COLUMN "photo",
DROP COLUMN "sub",
ADD COLUMN     "pass" TEXT NOT NULL;
