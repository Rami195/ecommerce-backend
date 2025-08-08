/*
  Warnings:

  - You are about to drop the column `codTipoMedioPago` on the `Cliente` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ArticuloPedido" DROP CONSTRAINT "ArticuloPedido_codPedido_fkey";

-- DropForeignKey
ALTER TABLE "Cliente" DROP CONSTRAINT "Cliente_codTipoMedioPago_fkey";

-- AlterTable
ALTER TABLE "ArticuloPedido" ALTER COLUMN "codPedido" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Cliente" DROP COLUMN "codTipoMedioPago";

-- CreateTable
CREATE TABLE "_ClienteToTipoMedioPago" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ClienteToTipoMedioPago_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ClienteToTipoMedioPago_B_index" ON "_ClienteToTipoMedioPago"("B");

-- AddForeignKey
ALTER TABLE "ArticuloPedido" ADD CONSTRAINT "ArticuloPedido_codPedido_fkey" FOREIGN KEY ("codPedido") REFERENCES "Pedido"("codPedido") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClienteToTipoMedioPago" ADD CONSTRAINT "_ClienteToTipoMedioPago_A_fkey" FOREIGN KEY ("A") REFERENCES "Cliente"("codCliente") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClienteToTipoMedioPago" ADD CONSTRAINT "_ClienteToTipoMedioPago_B_fkey" FOREIGN KEY ("B") REFERENCES "TipoMedioPago"("codTipoMedioPago") ON DELETE CASCADE ON UPDATE CASCADE;
