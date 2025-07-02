const prisma = require('../prismaClient');

// obtener todos los clientes activos

const getClientes = async (req, res) => {
        try {
            const clientes = await prisma.cliente.findMany({
                where: {
                    fechaHoraBajaCliente: null,
                },
                include: { usuario: true }
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
        const cliente = await prisma.cliente.findUnique({
            where: {
                codCliente: parseInt(id)
            },
            include: { usuario: true }
        });
        if (!cliente){
            return res.status(404).json({ error: 'Cliente no encontrado'});
        }
        res.json(cliente);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el cliente.' });
    }
};

// Crear Cliente

const createCliente = async (req, res) => {
    const{nombreCliente,dni,telefono, codUsuario} = req.body;

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
                codUsuario, // ya existente
            },
        });
        res.status(201).json(nuevoCliente);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el cliente.' });
    }
};

// modificar cliente

const updateCliente = async (req, res) => {
    const{ id } = req.params;
    const{ nombreCliente,dni,telefono } = req.body;
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
        const baja = await prisma.cliente.update({
            where: {
                codCliente: parseInt(id),
                fechaHoraBajaCliente: null
            },
            data: {
                fechaHoraBajaCliente: new Date(),
            },
        });
        res.status(201).json({ mensaje: 'Cliente dado de baja.', cliente: baja});
    } catch (error) {
        if (error.code === 'P2025') { // Prisma: record not fpund
            return res.status(404).json({ error: 'cliente no encontrado o ya dado de baja'});
        }
        res.status(500).json({ error: 'Error al dar de baja al cliente.' });
    }
}

module.exports ={
    getClientes,
    getClienteById,
    createCliente,
    updateCliente,
    deleteCliente,
};