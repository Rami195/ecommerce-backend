const prisma = require('../prismaClient');

exports.createPedido = async (req, res) => {
  try {
    const {
      impuestoSobreVenta,
      envioGratuito,
      codCliente,
      codEstado,
      codCarrito,
      articulos // solo: [{ codArticulo, cantidad }]
    } = req.body;

    // Validaciones (cliente, estado, carrito) - como ya lo hacés ✅

    // Calcular monto total desde precios reales
    let montoTotal = 0;
    const detalles = [];

    for (const art of articulos) {
      const articulo = await prisma.articulo.findUnique({
        where: { codArticulo: art.codArticulo },
      });

      if (!articulo) {
        return res.status(404).json({ error: `Artículo con ID ${art.codArticulo} no encontrado` });
      }

      const precioUnitario = articulo.precio;
      const subtotal = precioUnitario * art.cantidad;

      montoTotal += subtotal;

      detalles.push({
        codArticulo: art.codArticulo,
        cantidad: art.cantidad,
        precioUnitario,
        subtotal
      });
    }

    // Crear pedido
    const pedido = await prisma.pedido.create({
      data: {
        impuestoSobreVenta,
        envioGratuito,
        montoTotal,
        codCliente,
        codEstadoPedido: codEstado,
        codCarritoCompra: codCarrito,
      },
    });

    // Crear ArticuloPedido
    for (const det of detalles) {
      await prisma.articuloPedido.create({
        data: {
          codPedido: pedido.codPedido,
          codCarritoCompra: codCarrito,
          codArticulo: det.codArticulo,
          cantidadArtPed: det.cantidad,
          PrecioUnitario: det.precioUnitario,
          montoArticuloPe: det.subtotal,
        },
      });

      // Descontar stock
      await prisma.articulo.update({
        where: { codArticulo: det.codArticulo },
        data: { stock: { decrement: det.cantidad } },
      });
    }

    res.status(201).json({
      mensaje: 'Pedido creado correctamente',
      pedido
    });
  } catch (error) {
    console.error('Error al crear el pedido:', error);
    res.status(500).json({ error: 'Error al crear el pedido' });
  }
};


exports.updatePedido= async(req, res)=>{
    try{
        const codPedido=req.body
    }catch(error){
        console.error({error:'Error al modificar el pedido'})
        res.status(500).json({error:'Error al modificar el pedido'})
    }

}