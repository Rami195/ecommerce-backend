const prisma = require('../prismaClient');

// Obtener todos los estados de pedido activos
const getEstadoPedido = async (req, res) => {
    try {
        const estadoPedidos = await prisma.estadoPedido.findMany({
            where: {
                fechaHoraBajaEP: null,
            }
        });
        res.json(estadoPedidos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los estados de pedido' });
    }
};

// Obtener un estado de pedido por ID
const getEstadoPedidoById = async (req, res) => {
    const { id } = req.params;
    try {
        const estadoPedido = await prisma.estadoPedido.findFirst({
            where: {
                codEstadoPedido: parseInt(id),
                fechaHoraBajaEP: null
            },
        });
        if (!estadoPedido) {
            return res.status(404).json({ error: 'Estado de pedido no encontrado' });
        }
        res.json(estadoPedido);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el estado de pedido' });
    }
};

// Crear estado de pedido
const createEstadoPedido = async (req, res) => {
    const { nombreEstadoPedido } = req.body;
    try {
        const nuevoEstadoPedido = await prisma.estadoPedido.create({
            data: {
                nombreEstadoPedido,
            },
        });
        res.status(201).json(nuevoEstadoPedido);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el estado de pedido.' });
    }
};

// Actualizar estado de pedido
const updateEstadoPedido = async (req, res) => {
    const { id } = req.params;
    const { nombreEstadoPedido } = req.body;
    try {
        const estadoPedidoActualizado = await prisma.estadoPedido.update({
            where: {
                codEstadoPedido: parseInt(id)
            },
            data: {
                nombreEstadoPedido,
            },
        });
        res.status(200).json(estadoPedidoActualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el estado de pedido.' });
    }
};

// Eliminar (baja lógica) estado de pedido
const deleteEstadoPedido = async (req, res) => {
    const { id } = req.params;
    try {
        const estadoPedidoExistente = await prisma.estadoPedido.findFirst({
            where: {
                codEstadoPedido: parseInt(id),
                fechaHoraBajaEP: null
            }
        });
        if (!estadoPedidoExistente) {
            return res.status(404).json({ error: 'Estado de pedido no encontrado o ya dado de baja' });
        }
        const bajaEstadoPedido = await prisma.estadoPedido.update({
            where: {
                codEstadoPedido: parseInt(id)
            },
            data: {
                fechaHoraBajaEP: new Date()
            }
        });
        res.status(200).json({ mensaje: 'Estado de pedido dado de baja.', estadoPedido: bajaEstadoPedido });
    } catch (error) {
        res.status(500).json({ error: 'Error al dar de baja el estado de pedido' });
    }
};

module.exports = {
    getEstadoPedido,
    getEstadoPedidoById,
    createEstadoPedido,
    updateEstadoPedido,
    deleteEstadoPedido,
};