/*
  Warnings:

  - A unique constraint covering the columns `[nombreRolUsuario]` on the table `RolUsuario` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "RolUsuario_nombreRolUsuario_key" ON "RolUsuario"("nombreRolUsuario");
