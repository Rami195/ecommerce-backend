/*
  Warnings:

  - You are about to drop the column `codigoSegumiento` on the `EnvioPedido` table. All the data in the column will be lost.
  - Added the required column `codigoSeguimiento` to the `EnvioPedido` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EnvioPedido" DROP COLUMN "codigoSegumiento",
ADD COLUMN     "codigoSeguimiento" INTEGER NOT NULL;
