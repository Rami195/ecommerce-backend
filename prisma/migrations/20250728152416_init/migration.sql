/*
  Warnings:

  - You are about to drop the column `nombreTipoMedioPago` on the `Pago` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EnvioPedido" ADD COLUMN     "fechaHoraBjEnvioPedido" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Pago" DROP COLUMN "nombreTipoMedioPago";
