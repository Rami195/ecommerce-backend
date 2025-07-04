/*
  Warnings:

  - You are about to drop the column `activo` on the `RolUsuario` table. All the data in the column will be lost.
  - You are about to drop the column `tokenVerificacion` on the `RolUsuario` table. All the data in the column will be lost.
  - You are about to drop the column `verificado` on the `RolUsuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Articulo" ADD COLUMN     "fechaBajaArticulo" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "RolUsuario" DROP COLUMN "activo",
DROP COLUMN "tokenVerificacion",
DROP COLUMN "verificado";

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "activo" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "fechaHoraBajaUsuario" TIMESTAMP(3),
ADD COLUMN     "tokenVerificacion" TEXT,
ADD COLUMN     "ultimoRegistroUsuario" TIMESTAMP(3),
ADD COLUMN     "verificado" BOOLEAN NOT NULL DEFAULT false;
