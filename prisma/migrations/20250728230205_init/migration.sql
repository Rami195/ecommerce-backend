/*
  Warnings:

  - You are about to drop the column `codListaFavorito` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the `_ArticuloToListaFavorito` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ArticuloToListaFavorito" DROP CONSTRAINT "_ArticuloToListaFavorito_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArticuloToListaFavorito" DROP CONSTRAINT "_ArticuloToListaFavorito_B_fkey";

-- DropIndex
DROP INDEX "Cliente_codListaFavorito_key";

-- DropIndex
DROP INDEX "ListaFavorito_codCliente_key";

-- AlterTable
ALTER TABLE "Cliente" DROP COLUMN "codListaFavorito";

-- DropTable
DROP TABLE "_ArticuloToListaFavorito";

-- CreateTable
CREATE TABLE "ListaFavoritoArticulo" (
    "listaFavoritosId" INTEGER NOT NULL,
    "articuloId" INTEGER NOT NULL,

    CONSTRAINT "ListaFavoritoArticulo_pkey" PRIMARY KEY ("listaFavoritosId","articuloId")
);

-- AddForeignKey
ALTER TABLE "ListaFavoritoArticulo" ADD CONSTRAINT "ListaFavoritoArticulo_listaFavoritosId_fkey" FOREIGN KEY ("listaFavoritosId") REFERENCES "ListaFavorito"("codListaFavorito") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListaFavoritoArticulo" ADD CONSTRAINT "ListaFavoritoArticulo_articuloId_fkey" FOREIGN KEY ("articuloId") REFERENCES "Articulo"("codArticulo") ON DELETE RESTRICT ON UPDATE CASCADE;
