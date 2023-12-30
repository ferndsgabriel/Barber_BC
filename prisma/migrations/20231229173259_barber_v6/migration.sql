-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_adm_id_fkey";

-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_user_id_fkey";

-- AlterTable
ALTER TABLE "Token" ALTER COLUMN "user_id" DROP NOT NULL,
ALTER COLUMN "adm_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_adm_id_fkey" FOREIGN KEY ("adm_id") REFERENCES "Adm"("id") ON DELETE SET NULL ON UPDATE CASCADE;
