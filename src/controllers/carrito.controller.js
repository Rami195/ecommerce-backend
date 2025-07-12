const prisma = require('../prismaClient');

// update
exports.updateCarrito = async (req, res) => {

  const codCarritoCompra = parseInt(req.params.id)
  const { articulos, activo } = req.body
  try {
    const carrito = await prisma.carritoCompras.findUnique({
      where: { codCarritoCompra }
    })

    if (!carrito) {
      return res.status(404).json({ error: "carrito no encontrado" })
    }

    await prisma.articuloPedido.deleteMany({
      where: { codCarritoCompra }
    });

    let montoTotal = 0
    for (const art of articulos) {
      const articulo = await prisma.articulo.findUnique({
        where: { codArticulo: art.codArticulo }
      })


      if (!articulo) {
        return res.status(404).json({ error: `Artículo ${art.codArticulo} no encontrado` });
      }

      const subtotal = articulo.precio * art.cantidad;
      montoTotal += subtotal;

      await prisma.articuloPedido.create({
        data: {
          codCarritoCompra,
          codArticulo: art.codArticulo,
          cantidadArtPed: art.cantidad,
          PrecioUnitario: articulo.precio,
          montoArticuloPe: subtotal
        }
      });
    }

    const carritoActualizado = await prisma.carritoCompras.update({
      where: { codCarritoCompra },
      data: {
        montoCarritoCompra: montoTotal,
        ...(typeof activo === 'boolean' && { activo })
      },
      include: {
        articuloPedido: {
          include: {
            articulo: true
          }
        },
        cliente: true,
        pedido: true
      }
    });


    res.status(200).json({
      mensaje: 'Carrito actualizado correctamente',
      carrito: carritoActualizado
    });

  } catch (error) {
    console.error('Error al actualizar el carrito:', error);
    res.status(500).json({ error: 'Error al actualizar el carrito' });
  }
}



//get carritos
exports.getCarrito = async (req, res) => {
  try {
    const carritos = await prisma.carritoCompras.findMany({
      include: {
        cliente: true,
        articuloPedido: {
          include: {
            articulo: true
          }
        },
        pedido: true
      }
    })
    res.status(200).json(carritos);
  } catch (error) {
    console.error('Error al obtener los carritos', error);
    res.status(500).json({ error: 'Error al obtener los carritos' })
  }
}

// get carrito por id

exports.getCarritoByID = async (req, res) => {
  const { id } = req.params;
  try {
    const carrito = await prisma.carritoCompras.findUnique({
      where: { codCarritoCompra: parseInt(id) },
      include: {
        cliente: true,
        articuloPedido: {
          include: {
            articulo: true
          }
        },
        pedido: true
      }
    })
    res.status(200).json(carrito);
  } catch (error) {
    console.error('Error al obtener el carrito', error)
    res.status(500).json({ error: 'Error al obtener el carritos' })
  }
}