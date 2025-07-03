const prisma = require('../prismaClient')

exports.createPedido = async (req, res) => {
    try {
        const { cantidadArtPed, PrecioUnitario, codCarritoCompra, codArticulo, codPedido } = req.body

        // Validaciones mínimas
        const articulo = await prisma.articulo.findUnique({ where: { codArticulo } });
        if (!articulo) return res.status(404).json({ error: 'Artículo no encontrado' });

        const carrito = await prisma.carritoCompras.findUnique({ where: { codCarritoCompra } });
        if (!carrito) return res.status(404).json({ error: 'Carrito no encontrado' });

        const pedido = await prisma.pedido.findUnique({ where: { codPedido } });
        if (!pedido) return res.status(404).json({ error: 'Pedido no encontrado' });

        // Calcular monto total por artículo
        const montoArticuloPe = PrecioUnitario * cantidadArtPed;


        // Crear el artículo en pedido
        const nuevoArticuloPedido = await prisma.articuloPedido.create({
            data: {
                cantidadArtPed,
                PrecioUnitario,
                montoArticuloPe,
                codPedido,
                codCarritoCompra,
                codArticulo,
            },
        });
        res.status(201).json(nuevoArtPed)
    } catch (error) {
        console.error({ error: "Error al crear el detalle" })
        res.status(500).json({ error: "Error al crear el detalle" })
    }

}