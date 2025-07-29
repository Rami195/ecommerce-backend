/*
  Warnings:

  - You are about to drop the column `fechaEntregaBaja` on the `EnvioPedido` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EnvioPedido" DROP COLUMN "fechaEntregaBaja",
ADD COLUMN     "fechaEntregaReal" TIMESTAMP(3);
