/*
  Warnings:

  - Added the required column `codigoSegumiento` to the `EnvioPedido` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EnvioPedido" ADD COLUMN     "codigoSegumiento" INTEGER NOT NULL;
