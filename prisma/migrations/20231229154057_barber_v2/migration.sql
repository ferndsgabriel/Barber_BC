/*
  Warnings:

  - You are about to drop the column `pass` on the `Adm` table. All the data in the column will be lost.
  - You are about to drop the column `pass` on the `User` table. All the data in the column will be lost.
  - Added the required column `photo` to the `Adm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sub` to the `Adm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sub` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Adm" DROP COLUMN "pass",
ADD COLUMN     "photo" TEXT NOT NULL,
ADD COLUMN     "sub" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "pass",
ADD COLUMN     "photo" TEXT NOT NULL,
ADD COLUMN     "sub" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Token" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "adm_id" TEXT NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_adm_id_fkey" FOREIGN KEY ("adm_id") REFERENCES "Adm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
