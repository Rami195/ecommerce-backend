-- DropForeignKey
ALTER TABLE "Cliente" DROP CONSTRAINT "Cliente_codUsuario_fkey";

-- AlterTable
ALTER TABLE "Cliente" ALTER COLUMN "codUsuario" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_codUsuario_fkey" FOREIGN KEY ("codUsuario") REFERENCES "Usuario"("codUsuario") ON DELETE SET NULL ON UPDATE CASCADE;
