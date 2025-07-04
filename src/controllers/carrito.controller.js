const prisma = require('../prismaClient');

// Crear carrito para un cliente
exports.createCarrito = async (req, res) => {
  try {
    const { codCliente } = req.body;

    // Validar que el cliente exista
    const cliente = await prisma.cliente.findUnique({
      where: { codCliente },
    });
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    // Verificar si ya tiene un carrito
    const carritoExistente = await prisma.carritoCompras.findUnique({
      where: { codCliente },
    });
    if (carritoExistente) {
      return res.status(400).json({ error: 'El cliente ya tiene un carrito asignado' });
    }

    // Crear el carrito
    const carrito = await prisma.carritoCompras.create({
      data: {
        codCliente,
        montoCarritoCompra: 0,
      },
    });

    res.status(201).json(carrito);
  } catch (error) {
    console.error('Error al crear carrito:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};