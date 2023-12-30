/*
  Warnings:

  - Added the required column `image` to the `Additional` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `HairStyle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Additional" ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "HairStyle" ADD COLUMN     "image" TEXT NOT NULL;
