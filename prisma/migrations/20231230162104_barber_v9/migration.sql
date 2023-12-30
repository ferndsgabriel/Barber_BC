/*
  Warnings:

  - Added the required column `name` to the `Additional` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `HairStyle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Additional" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "HairStyle" ADD COLUMN     "name" TEXT NOT NULL;
