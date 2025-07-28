const prisma = require('../prismaClient');

//obtener todos los estados de pago

const getEstadoPago = async (req,res) =>{
    try {
        const estadoPagos  = await prisma.estadoPago.findMany({
            where: {
                fechaHoraBajaEP: null,
            }
        });

        res.json(estadoPagos)
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los estados de pago'})
    }
};

//obtener un estado de pago

const getEstadoPagoById = async (req,res) => {
    const{id} = req.params;

    try {
        const estadoPago = await prisma.estadoPago.findFirst({
            where: {
                codEstadoPago: parseInt(id),
                fechaHoraBajaEP: null
            },
        });

        if (!estadoPago) {
            return  res.status(404).json({ error: 'Estado pago no encontrado'});
        }

        res.json(estadoPago)

    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el estado pago' })
    }
};

// crear estado pago

const createEstadoPago = async (req,res) => {
    const{nombreEstadoPago} = req.body

    try {
        const nuevoEstadoPago = await prisma.estadoPago.create({
            data:{
                nombreEstadoPago,
            },
        });

        res.status(201).json(nuevoEstadoPago);

    } catch (error) {
        res.status(500).json({ error: 'Error al crear el estado pago.' });       
    }
}; 

//actualizar un estado pago

const updateEstadoPago = async (req,res) => {
    const{id} = req.params;
    const{nombreEstadoPago} = req.body;

    try {
        const estadoPagoActualizado = await prisma.estadoPago.update({
            where: {
                codEstadoPago: parseInt(id)
            },

            data: {
                nombreEstadoPago,
            },

        });

        res.status(200).json(estadoPagoActualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el estado pago.' });       
    }
};

//Eliminar estado pago

const deleteEstadoPago = async (req, res) => {
    const { id } = req.params;

    try {
        // Primero verificamos si existe y no fue dada de baja
        const estadoPagoExistente = await prisma.estadoPago.findFirst({
            where: {
                codEstadoPago: parseInt(id),
                fechaHoraBajaEP: null
            }
        });

        if (!estadoPagoExistente) {
            return res.status(404).json({ error: 'Estado pago no encontrado o ya dada de baja' });
        }

        // Si existe, hacemos la baja lógica
        const bajaEstadoPago = await prisma.estadoPago.update({
            where: {
                codEstadoPago: parseInt(id)
            },
            data: {
                fechaHoraBajaEP: new Date()
            }
        });

        res.status(200).json({ mensaje: 'Estado pago dada de baja.', estadoPago: bajaEstadoPago });

    } catch (error) {
        res.status(500).json({ error: 'Error al dar de baja el estado pago' });
    }
};


module.exports = {
    getEstadoPago,
    getEstadoPagoById,
    createEstadoPago,
    updateEstadoPago,
    deleteEstadoPago,
};

