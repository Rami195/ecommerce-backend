const prisma = require('../prismaClient');

// Obtener todos los estados de envío activos
const getEstadoEnvio = async (req, res) => {
    try {
        const estadoEnvios = await prisma.estadoEnvio.findMany({
            where: {
                fechaHoraBajaEE: null,
            }
        });
        res.json(estadoEnvios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los estados de envío' });
    }
};

// Obtener un estado de envío por ID
const getEstadoEnvioById = async (req, res) => {
    const { id } = req.params;
    try {
        const estadoEnvio = await prisma.estadoEnvio.findFirst({
            where: {
                codEstadoEnvio: parseInt(id),
                fechaHoraBajaEE: null
            },
        });
        if (!estadoEnvio) {
            return res.status(404).json({ error: 'Estado de envío no encontrado' });
        }
        res.json(estadoEnvio);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el estado de envío' });
    }
};

// Crear estado de envío
const createEstadoEnvio = async (req, res) => {
    const { nombreEstadoEnvio } = req.body;
    try {
        const nuevoEstadoEnvio = await prisma.estadoEnvio.create({
            data: {
                nombreEstadoEnvio,
            },
        });
        res.status(201).json(nuevoEstadoEnvio);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el estado de envío.' });
    }
};

// Actualizar estado de envío
const updateEstadoEnvio = async (req, res) => {
    const { id } = req.params;
    const { nombreEstadoEnvio } = req.body;
    try {
        const estadoEnvioExistente = await prisma.estadoEnvio.findFirst({
            where: {
                codEstadoEnvio: parseInt(id),
                fechaHoraBajaEE: null
            }
        });
        if (!estadoEnvioExistente) {
            return res.status(404).json({ error: 'Estado de envío no encontrado o ya dado de baja' });
        }
        const estadoEnvioActualizado = await prisma.estadoEnvio.update({
            where: {
                codEstadoEnvio: parseInt(id)
            },
            data: {
                nombreEstadoEnvio,
            },
        });
        res.status(200).json(estadoEnvioActualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el estado de envío.' });
    }
};

// Eliminar (baja lógica) estado de envío
const deleteEstadoEnvio = async (req, res) => {
    const { id } = req.params;
    try {
        const estadoEnvioExistente = await prisma.estadoEnvio.findFirst({
            where: {
                codEstadoEnvio: parseInt(id),
                fechaHoraBajaEE: null
            }
        });
        if (!estadoEnvioExistente) {
            return res.status(404).json({ error: 'Estado de envío no encontrado o ya dado de baja' });
        }
        const bajaEstadoEnvio = await prisma.estadoEnvio.update({
            where: {
                codEstadoEnvio: parseInt(id)
            },
            data: {
                fechaHoraBajaEE: new Date()
            }
        });
        res.status(200).json({ mensaje: 'Estado de envío dado de baja.', estadoEnvio: bajaEstadoEnvio });
    } catch (error) {
        res.status(500).json({ error: 'Error al dar de baja el estado de envío' });
    }
};

module.exports = {
    getEstadoEnvio,
    getEstadoEnvioById,
    createEstadoEnvio,
    updateEstadoEnvio,
    deleteEstadoEnvio,
};