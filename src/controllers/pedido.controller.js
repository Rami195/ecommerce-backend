const prisma = require('../prismaClient');

exports.createPedido = async (req, res) => {
  try {
    const { impuestoSobreVenta, envioGratuito, codCliente, codEstado, codCarrito, articulos } = req.body;

    const cliente = await prisma.cliente.findUnique({ where: { codCliente } });
    if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });

    const estado = await prisma.estadoPedido.findUnique({ where: { codEstadoPedido: codEstado } });
    if (!estado) return res.status(404).json({ error: 'Estado del pedido no encontrado' });

    const carrito = await prisma.carritoCompras.findUnique({ where: { codCarritoCompra: codCarrito } });
    if (!carrito) return res.status(404).json({ error: 'Carrito no encontrado' });

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


    await prisma.carritoCompras.update({
      where: { codCarritoCompra: codCarrito },
      data: { activo: false }
    })

    const nuevoCarrito = await prisma.carritoCompras.create({
      data: {
        montoCarritoCompra: 0,
        codCliente: codCliente,
        activo: true
      }
    })



    res.status(201).json({
      mensaje: 'Pedido creado correctamente',
      pedido,
      nuevoCarrito
    });
  } catch (error) {
    console.error('Error al crear el pedido:', error);
    res.status(500).json({ error: 'Error al crear el pedido' });
  }
};


exports.updatePedido = async (req, res) => {
  try {
    const codPedido = parseInt(req.params.id)
    const { impuestoSobreVenta, envioGratuito, codEstado, articulos } = req.body

    //Existe el pedido?
    const existe = await prisma.pedido.findUnique({
      where: { codPedido }
    })
    if (!existe) {
      return res.status(404).json({ error: 'Pedido no encontrada' })
    }

    //restaua sotck de articulos anteriores
    const articulosAnteriores = await prisma.articuloPedido.findMany({
      where: { codPedido: parseInt(codPedido) },
    });

    for (const ap of articulosAnteriores) {
      await prisma.articulo.update({
        where: { codArticulo: ap.codArticulo },
        data: { stock: { increment: ap.cantidadArtPed } }, // Restaurar
      });
    }

    //Borra los articulos que estaban anteriormente
    await prisma.articuloPedido.deleteMany({
      where: { codPedido: codPedido }
    })

    // Insertar nuevos detalles y calcular monto total
    let montoTotal = 0
    for (const art of articulos) {
      const articulo = await prisma.articulo.findUnique({
        where: { codArticulo: art.codArticulo }
      })
      if (!articulo) {
        return res.status(404).json({ error: "Articulo no encontrado" })
      }

      const precioUnitario = articulo.precio;
      const subtotal = precioUnitario * art.cantidad
      montoTotal += subtotal

      // Crear nuevo ArticuloPedido
      await prisma.articuloPedido.create({
        data: {
          codPedido: codPedido,
          codCarritoCompra: existe.codCarritoCompra,
          codArticulo: art.codArticulo,
          cantidadArtPed: art.cantidad,
          PrecioUnitario: precioUnitario,
          montoArticuloPe: subtotal
        }
      })
      // Descontar stock
      await prisma.articulo.update({
        where: { codArticulo: art.codArticulo },
        data: { stock: { decrement: art.cantidad } },
      });
    }

    const pedidoActualizado = await prisma.pedido.update({
      where: { codPedido },
      data: {
        impuestoSobreVenta,
        envioGratuito,
        montoTotal,
        codEstadoPedido: codEstado
      }
    })

    res.status(200).json({
      mensaje: 'Pedido actualizado correctamente',
      pedido: pedidoActualizado
    });

  } catch (error) {
    console.error({ error: 'Error al modificar el pedido', error })
    res.status(500).json({ error: 'Error al modificar el pedido' })
  }

}


exports.updateEstadoPedido = async (req, res) => {
  try {
    const codPedido = parseInt(req.params.id)
    const { codEstado } = req.body

    if (isNaN(codPedido)) {
      return res.status(400).json({ error: 'ID de pedido inválido' });
    }

    const pedido = await prisma.pedido.findUnique({
      where: { codPedido },
      include: {
        estadoPedido: true
      }
    })

    if (!pedido) {
      return res.status(404).json({ error: "Pedido no encontrado" })
    }

    const estadoActual = pedido.estadoPedido.nombreEstadoPedido;

    const nuevoEstado = await prisma.estadoPedido.findUnique({
      where: { codEstadoPedido: codEstado }
    })

    if (!nuevoEstado) {
      return res.status(404).json({ error: 'Nuevo estado no válido' });
    }

    const estadoDestino = nuevoEstado.nombreEstadoPedido;

    const transicionesValidas = {
      'Pendiente': ['Confirmado'],
      'Confirmado': ['Enviado', 'Cancelado'],
      'Enviado': ['Entregado'],
      'Entregado': ['Finalizado']
    }

    const transicionesPermitidas = transicionesValidas[estadoActual] || [];

    if (!transicionesPermitidas.includes(estadoDestino)) {
      return res.status(400).json({
        error: `Transición no permitida de "${estadoActual}" a "${estadoDestino}"`
      });
    }



    // Actualizar estado
    const pedidoActualizado = await prisma.pedido.update({
      where: { codPedido },
      data: { codEstadoPedido: codEstado }
    });

    res.status(200).json({
      mensaje: `Estado del pedido cambiado de "${estadoActual}" a "${estadoDestino}"`,
      pedido: pedidoActualizado
    });

  } catch (error) {
    console.error('Error al actualizar el estado del pedido:', error);
    res.status(500).json({ error: 'Error al actualizar el estado del pedido' });
  }
};


// getBy
exports.getPedidoById = async (req, res) => {
  const { id } = req.params;

  try {
    const pedido = await prisma.pedido.findUnique({
      where: { codPedido: parseInt(id) },
      include: {
        cliente: true,
        estadoPedido: true,
        carritoCompra: true,
        articuloPedido: {
          include: {
            articulo: true
          }
        }
      }
    });

    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    res.status(200).json(pedido);
  } catch (error) {
    console.error('Error al obtener el pedido por ID:', error);
    res.status(500).json({ error: 'Error al obtener el pedido' });
  }
};


// get todos los pedidos
exports.getPedidos = async (req, res) => {
  try {
    const pedidos = await prisma.pedido.findMany({
      include: {
        cliente: true,
        estadoPedido: true,
            carritoCompra: true, 
        articuloPedido: {
          include: {
            articulo: true
          }
        }
      }
    });
    res.status(200).json(pedidos);
  } catch (error) {
    console.error('Error al obtener los pedidos:', error);
    res.status(500).json({ error: 'Error al obtener los pedidos' });
  }
};
