/*
  Warnings:

  - You are about to alter the column `timer` on the `Additional` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `timer` on the `HairStyle` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Additional" ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "timer" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "HairStyle" ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "timer" SET DATA TYPE INTEGER;
