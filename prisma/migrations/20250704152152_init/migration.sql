-- CreateTable
CREATE TABLE "Cliente" (
    "codCliente" SERIAL NOT NULL,
    "nombreCliente" TEXT NOT NULL,
    "dni" INTEGER NOT NULL,
    "telefono" INTEGER NOT NULL,
    "fechaHoraBajaCliente" TIMESTAMP(3),
    "codUsuario" INTEGER NOT NULL,
    "codListaFavorito" INTEGER,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("codCliente")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "codUsuario" SERIAL NOT NULL,
    "nombreUsuario" TEXT NOT NULL,
    "contraseñaUsuario" TEXT NOT NULL,
    "emailUsuario" TEXT NOT NULL,
    "fechaRegistroUsuario" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ultimoRegistroUsuario" TIMESTAMP(3),
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "verificado" BOOLEAN NOT NULL DEFAULT false,
    "tokenVerificacion" TEXT,
    "fechaHoraBajaUsuario" TIMESTAMP(3),
    "codRolUsuario" INTEGER NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("codUsuario")
);

-- CreateTable
CREATE TABLE "RolUsuario" (
    "codRolUsuario" SERIAL NOT NULL,
    "nombreRolUsuario" TEXT NOT NULL,
    "fechaHoraBajaRol" TIMESTAMP(3),
    "permisoUsuario" TEXT[],

    CONSTRAINT "RolUsuario_pkey" PRIMARY KEY ("codRolUsuario")
);

-- CreateTable
CREATE TABLE "Direccion" (
    "codigoDireccion" SERIAL NOT NULL,
    "calle" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,
    "localidad" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "codigoPostal" INTEGER NOT NULL,
    "codCliente" INTEGER NOT NULL,

    CONSTRAINT "Direccion_pkey" PRIMARY KEY ("codigoDireccion")
);

-- CreateTable
CREATE TABLE "Pedido" (
    "codPedido" SERIAL NOT NULL,
    "impuestoSobreVenta" DOUBLE PRECISION NOT NULL,
    "envioGratuito" BOOLEAN NOT NULL,
    "montoTotal" DOUBLE PRECISION NOT NULL,
    "fechaAltaPedido" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "codCliente" INTEGER NOT NULL,
    "codCarritoCompra" INTEGER NOT NULL,
    "codEstadoPedido" INTEGER NOT NULL,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("codPedido")
);

-- CreateTable
CREATE TABLE "EstadoPedido" (
    "codEstadoPedido" SERIAL NOT NULL,
    "nombreEstadoPedido" TEXT NOT NULL,
    "fechaHoraBajaEP" TIMESTAMP(3),

    CONSTRAINT "EstadoPedido_pkey" PRIMARY KEY ("codEstadoPedido")
);

-- CreateTable
CREATE TABLE "CarritoCompras" (
    "codCarritoCompra" SERIAL NOT NULL,
    "montoCarritoCompra" DOUBLE PRECISION NOT NULL,
    "codPedido" INTEGER,
    "codCliente" INTEGER NOT NULL,

    CONSTRAINT "CarritoCompras_pkey" PRIMARY KEY ("codCarritoCompra")
);

-- CreateTable
CREATE TABLE "ListaFavorito" (
    "codListaFavorito" SERIAL NOT NULL,
    "nombreListaFavorito" TEXT NOT NULL,
    "codCliente" INTEGER NOT NULL,

    CONSTRAINT "ListaFavorito_pkey" PRIMARY KEY ("codListaFavorito")
);

-- CreateTable
CREATE TABLE "Articulo" (
    "codArticulo" SERIAL NOT NULL,
    "nombreArticulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "fechaBajaArticulo" TIMESTAMP(3),

    CONSTRAINT "Articulo_pkey" PRIMARY KEY ("codArticulo")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "codCategoria" SERIAL NOT NULL,
    "nombreCategoria" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fechaBajaCategoria" TIMESTAMP(3),

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("codCategoria")
);

-- CreateTable
CREATE TABLE "ArticuloPedido" (
    "cantidadArtPed" INTEGER NOT NULL,
    "nroRenglon" SERIAL NOT NULL,
    "montoArticuloPe" DOUBLE PRECISION NOT NULL,
    "PrecioUnitario" DOUBLE PRECISION NOT NULL,
    "codPedido" INTEGER NOT NULL,
    "codCarritoCompra" INTEGER NOT NULL,
    "codArticulo" INTEGER NOT NULL,

    CONSTRAINT "ArticuloPedido_pkey" PRIMARY KEY ("nroRenglon")
);

-- CreateTable
CREATE TABLE "EnvioPedido" (
    "codEnvio" SERIAL NOT NULL,
    "empresaEnvio" TEXT NOT NULL,
    "costoEnvio" DOUBLE PRECISION NOT NULL,
    "fechaSalida" TIMESTAMP(3),
    "fechaEntregaEstimada" TIMESTAMP(3) NOT NULL,
    "fechaEntregaBaja" TIMESTAMP(3),
    "codEstadoEnvio" INTEGER NOT NULL,
    "codigoDireccion" INTEGER NOT NULL,

    CONSTRAINT "EnvioPedido_pkey" PRIMARY KEY ("codEnvio")
);

-- CreateTable
CREATE TABLE "EstadoEnvio" (
    "codEstadoEnvio" SERIAL NOT NULL,
    "nombreEstadoEnvio" TEXT NOT NULL,
    "fechaHoraBajaEE" TIMESTAMP(3),

    CONSTRAINT "EstadoEnvio_pkey" PRIMARY KEY ("codEstadoEnvio")
);

-- CreateTable
CREATE TABLE "MedioPago" (
    "codMedioPago" SERIAL NOT NULL,
    "nombreTipoMedioPago" TEXT NOT NULL,
    "fechaHoraBajaMedioPago" TIMESTAMP(3),

    CONSTRAINT "MedioPago_pkey" PRIMARY KEY ("codMedioPago")
);

-- CreateTable
CREATE TABLE "Pago" (
    "codPago" SERIAL NOT NULL,
    "nombreTipoMedioPago" TEXT NOT NULL,
    "montoPagado" DOUBLE PRECISION NOT NULL,
    "transaccionId" INTEGER NOT NULL,
    "fechaHoraPago" TIMESTAMP(3),
    "codMedioPago" INTEGER NOT NULL,
    "codEstadoPago" INTEGER NOT NULL,

    CONSTRAINT "Pago_pkey" PRIMARY KEY ("codPago")
);

-- CreateTable
CREATE TABLE "EstadoPago" (
    "codEstadoPago" SERIAL NOT NULL,
    "nombreEstadoPago" TEXT NOT NULL,
    "fechaHoraBajaEP" TIMESTAMP(3),

    CONSTRAINT "EstadoPago_pkey" PRIMARY KEY ("codEstadoPago")
);

-- CreateTable
CREATE TABLE "_ClienteToMedioPago" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ClienteToMedioPago_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ArticuloToListaFavorito" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ArticuloToListaFavorito_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ArticuloCategoria" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ArticuloCategoria_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_codUsuario_key" ON "Cliente"("codUsuario");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_codListaFavorito_key" ON "Cliente"("codListaFavorito");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_emailUsuario_key" ON "Usuario"("emailUsuario");

-- CreateIndex
CREATE UNIQUE INDEX "RolUsuario_nombreRolUsuario_key" ON "RolUsuario"("nombreRolUsuario");

-- CreateIndex
CREATE UNIQUE INDEX "Pedido_codCarritoCompra_key" ON "Pedido"("codCarritoCompra");

-- CreateIndex
CREATE UNIQUE INDEX "EstadoPedido_nombreEstadoPedido_key" ON "EstadoPedido"("nombreEstadoPedido");

-- CreateIndex
CREATE UNIQUE INDEX "CarritoCompras_codPedido_key" ON "CarritoCompras"("codPedido");

-- CreateIndex
CREATE UNIQUE INDEX "CarritoCompras_codCliente_key" ON "CarritoCompras"("codCliente");

-- CreateIndex
CREATE UNIQUE INDEX "ListaFavorito_codCliente_key" ON "ListaFavorito"("codCliente");

-- CreateIndex
CREATE INDEX "_ClienteToMedioPago_B_index" ON "_ClienteToMedioPago"("B");

-- CreateIndex
CREATE INDEX "_ArticuloToListaFavorito_B_index" ON "_ArticuloToListaFavorito"("B");

-- CreateIndex
CREATE INDEX "_ArticuloCategoria_B_index" ON "_ArticuloCategoria"("B");

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_codUsuario_fkey" FOREIGN KEY ("codUsuario") REFERENCES "Usuario"("codUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_codRolUsuario_fkey" FOREIGN KEY ("codRolUsuario") REFERENCES "RolUsuario"("codRolUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Direccion" ADD CONSTRAINT "Direccion_codCliente_fkey" FOREIGN KEY ("codCliente") REFERENCES "Cliente"("codCliente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_codCliente_fkey" FOREIGN KEY ("codCliente") REFERENCES "Cliente"("codCliente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_codCarritoCompra_fkey" FOREIGN KEY ("codCarritoCompra") REFERENCES "CarritoCompras"("codCarritoCompra") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_codEstadoPedido_fkey" FOREIGN KEY ("codEstadoPedido") REFERENCES "EstadoPedido"("codEstadoPedido") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarritoCompras" ADD CONSTRAINT "CarritoCompras_codCliente_fkey" FOREIGN KEY ("codCliente") REFERENCES "Cliente"("codCliente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListaFavorito" ADD CONSTRAINT "ListaFavorito_codCliente_fkey" FOREIGN KEY ("codCliente") REFERENCES "Cliente"("codCliente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticuloPedido" ADD CONSTRAINT "ArticuloPedido_codPedido_fkey" FOREIGN KEY ("codPedido") REFERENCES "Pedido"("codPedido") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticuloPedido" ADD CONSTRAINT "ArticuloPedido_codCarritoCompra_fkey" FOREIGN KEY ("codCarritoCompra") REFERENCES "CarritoCompras"("codCarritoCompra") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticuloPedido" ADD CONSTRAINT "ArticuloPedido_codArticulo_fkey" FOREIGN KEY ("codArticulo") REFERENCES "Articulo"("codArticulo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnvioPedido" ADD CONSTRAINT "EnvioPedido_codEstadoEnvio_fkey" FOREIGN KEY ("codEstadoEnvio") REFERENCES "EstadoEnvio"("codEstadoEnvio") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnvioPedido" ADD CONSTRAINT "EnvioPedido_codigoDireccion_fkey" FOREIGN KEY ("codigoDireccion") REFERENCES "Direccion"("codigoDireccion") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pago" ADD CONSTRAINT "Pago_codMedioPago_fkey" FOREIGN KEY ("codMedioPago") REFERENCES "MedioPago"("codMedioPago") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pago" ADD CONSTRAINT "Pago_codEstadoPago_fkey" FOREIGN KEY ("codEstadoPago") REFERENCES "EstadoPago"("codEstadoPago") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClienteToMedioPago" ADD CONSTRAINT "_ClienteToMedioPago_A_fkey" FOREIGN KEY ("A") REFERENCES "Cliente"("codCliente") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClienteToMedioPago" ADD CONSTRAINT "_ClienteToMedioPago_B_fkey" FOREIGN KEY ("B") REFERENCES "MedioPago"("codMedioPago") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticuloToListaFavorito" ADD CONSTRAINT "_ArticuloToListaFavorito_A_fkey" FOREIGN KEY ("A") REFERENCES "Articulo"("codArticulo") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticuloToListaFavorito" ADD CONSTRAINT "_ArticuloToListaFavorito_B_fkey" FOREIGN KEY ("B") REFERENCES "ListaFavorito"("codListaFavorito") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticuloCategoria" ADD CONSTRAINT "_ArticuloCategoria_A_fkey" FOREIGN KEY ("A") REFERENCES "Articulo"("codArticulo") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticuloCategoria" ADD CONSTRAINT "_ArticuloCategoria_B_fkey" FOREIGN KEY ("B") REFERENCES "Categoria"("codCategoria") ON DELETE CASCADE ON UPDATE CASCADE;
