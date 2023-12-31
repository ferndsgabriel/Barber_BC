-- AlterTable
ALTER TABLE "Adm" ADD COLUMN     "photo" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "photo" DROP NOT NULL;
