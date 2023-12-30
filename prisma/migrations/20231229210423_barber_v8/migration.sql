/*
  Warnings:

  - Added the required column `hairStyle_id` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "additional_id" TEXT,
ADD COLUMN     "hairStyle_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "HairStyle" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "timer" INTEGER NOT NULL,

    CONSTRAINT "HairStyle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Additional" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "timer" INTEGER NOT NULL,

    CONSTRAINT "Additional_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_hairStyle_id_fkey" FOREIGN KEY ("hairStyle_id") REFERENCES "HairStyle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_additional_id_fkey" FOREIGN KEY ("additional_id") REFERENCES "Additional"("id") ON DELETE SET NULL ON UPDATE CASCADE;
