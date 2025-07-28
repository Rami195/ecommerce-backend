/*
  Warnings:

  - You are about to drop the column `codMedioPago` on the `Pago` table. All the data in the column will be lost.
  - You are about to drop the `MedioPago` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ClienteToMedioPago` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `codTipoMedioPago` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codTipoMedioPago` to the `Pago` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pago" DROP CONSTRAINT "Pago_codMedioPago_fkey";

-- DropForeignKey
ALTER TABLE "_ClienteToMedioPago" DROP CONSTRAINT "_ClienteToMedioPago_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClienteToMedioPago" DROP CONSTRAINT "_ClienteToMedioPago_B_fkey";

-- AlterTable
ALTER TABLE "Cliente" ADD COLUMN     "codTipoMedioPago" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Pago" DROP COLUMN "codMedioPago",
ADD COLUMN     "codTipoMedioPago" INTEGER NOT NULL;

-- DropTable
DROP TABLE "MedioPago";

-- DropTable
DROP TABLE "_ClienteToMedioPago";

-- CreateTable
CREATE TABLE "TipoMedioPago" (
    "codTipoMedioPago" SERIAL NOT NULL,
    "nombreTipoMedioPago" TEXT NOT NULL,
    "fechaHoraBajaTipoMedioPago" TIMESTAMP(3),

    CONSTRAINT "TipoMedioPago_pkey" PRIMARY KEY ("codTipoMedioPago")
);

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_codTipoMedioPago_fkey" FOREIGN KEY ("codTipoMedioPago") REFERENCES "TipoMedioPago"("codTipoMedioPago") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pago" ADD CONSTRAINT "Pago_codTipoMedioPago_fkey" FOREIGN KEY ("codTipoMedioPago") REFERENCES "TipoMedioPago"("codTipoMedioPago") ON DELETE RESTRICT ON UPDATE CASCADE;
