const prisma = require('../prismaClient');

// obtener todos los clientes activos

const getClientes = async (req, res) => {
    try {
        const clientes = await prisma.cliente.findMany({
            where: {
                fechaHoraBajaCliente: null,
            },
            include: {
                usuario: true,
                direccion: true
            }
        });
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los clientes.' });
    }
};

//obtener un cliente por id

const getClienteById = async (req, res) => {
    const { id } = req.params;
    try {
        const cliente = await prisma.cliente.findFirst({
            where: {
                codCliente: parseInt(id),
                fechaHoraBajaCliente: null
            },
            include: {
                usuario: true,
                direccion: true
            }
        });
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.json(cliente);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el cliente.' });
    }
};

// Crear Cliente

const createCliente = async (req, res) => {
    const { nombreCliente, dni, telefono, codUsuario } = req.body;

    try {
        const existe = await prisma.cliente.findUnique({
            where: { codUsuario }
        });
        if (existe) {
            return res.status(400).json({ error: 'Este usuario ya está vinculado a un cliente.' });
        }

        const nuevoCliente = await prisma.cliente.create({
            data: {
                nombreCliente,
                dni,
                telefono,
                codUsuario,
                carritos: {
                    create: {
                        montoCarritoCompra: 0,
                        activo: true
                    }
                }
            },
            include: {
                carritos: true
            }
        });


        res.status(201).json(nuevoCliente);
    } catch (error) {
        console.error('Error al crear el cliente con carrito:', error);
        res.status(500).json({ error: 'Error al crear el cliente.' });
    }
};

// modificar cliente

const updateCliente = async (req, res) => {
    const { id } = req.params;
    const { nombreCliente, dni, telefono } = req.body;
    try {
        const clienteActualizado = await prisma.cliente.update({
            where: {
                codCliente: parseInt(id)
            },

            data: {
                nombreCliente,
                dni,
                telefono,
            },
        });
        res.status(201).json(clienteActualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el cliente.' });
    }
};

// Eliminar cliente, baja logica

const deleteCliente = async (req, res) => {
    const { id } = req.params;

    try {
        const clienteExistente = await prisma.cliente.findFirst({
            where: {
                codCliente: parseInt(id),
                fechaHoraBajaCliente: null
            }
        });

        if (!clienteExistente) {
            return res.status(404).json({ error: 'Cliente no encontrado o ya dado de baja' });
        }

        const baja = await prisma.cliente.update({
            where: {
                codCliente: parseInt(id)
            },
            data: {
                fechaHoraBajaCliente: new Date()
            }
        });

        res.status(200).json({ mensaje: 'Cliente dado de baja.', cliente: baja });

    } catch (error) {
        res.status(500).json({ error: 'Error al dar de baja al cliente.' });
    }
};

module.exports = {
    getClientes,
    getClienteById,
    createCliente,
    updateCliente,
    deleteCliente,
};