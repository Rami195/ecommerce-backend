const prisma = require('../prismaClient');

//obtener todos los tipos de medios de pago

const getTipoMedioPago = async (req,res) =>{
    try {
        const tiposMediosPagos = await prisma.tipoMedioPago.findMany({
            where: {
                fechaHoraBajaTipoMedioPago: null,
            }
        });

        res.json(tiposMediosPagos)
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los tipos de medios de pago'})
    }
};

//obtener un tipo de medio de pago

const getTipoMedioPagoById = async (req,res) => {
    const{id} = req.params;

    try {
        const tiposMP = await prisma.tipoMedioPago.findFirst({
            where: {
                codTipoMedioPago: parseInt(id),
                fechaHoraBajaTipoMedioPago: null
            },
        });

        if (!tiposMP) {
            return  res.status(404).json({ error: 'Tipo de medio de pago no encontrado'});
        }

        res.json(tiposMP)

    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el tipo medio de pago' })
    }
};

// crear tipo de medio de pago

const createTipoMedioPago = async (req,res) => {
    const{nombreTipoMedioPago} = req.body

    try {
        const nuevoTipoMedioPago = await prisma.tipoMedioPago.create({
            data:{
                nombreTipoMedioPago,
            },
        });

        res.status(201).json(nuevoTipoMedioPago);

    } catch (error) {
        res.status(500).json({ error: 'Error al crear el tipo de medio de pago.' });       
    }
}; 

//actualizar un tipo de medio de pago

const updateTipoMedioPago = async (req,res) => {
    const{id} = req.params;
    const{nombreTipoMedioPago} = req.body;

    try {
        const tipoMedioPagoActualizado = await prisma.tipoMedioPago.update({
            where: {
                codTipoMedioPago: parseInt(id)
            },

            data: {
                nombreTipoMedioPago,
            },

        });

        res.status(200).json(tipoMedioPagoActualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el tipo de medio de pago.' });       
    }
};

//Eliminar Tipo de Medio de Pago

const deleteTipoMedioPago = async (req, res) => {
    const { id } = req.params;

    try {
        // Primero verificamos si existe y no fue dada de baja
        const tipoMedioPagoExistente = await prisma.tipoMedioPago.findFirst({
            where: {
                codTipoMedioPago: parseInt(id),
                fechaHoraBajaTipoMedioPago: null
            }
        });

        if (!tipoMedioPagoExistente) {
            return res.status(404).json({ error: 'Tipo medio de pago no encontrado o ya dada de baja' });
        }

        // Si existe, hacemos la baja lógica
        const bajaTipoMedioPago = await prisma.tipoMedioPago.update({
            where: {
                codTipoMedioPago: parseInt(id)
            },
            data: {
                fechaHoraBajaTipoMedioPago: new Date()
            }
        });

        res.status(200).json({ mensaje: 'Tipo medio de pago dada de baja.', tipoMedioPago: bajaTipoMedioPago });

    } catch (error) {
        res.status(500).json({ error: 'Error al dar de baja el tipo medio de pago' });
    }
};


module.exports = {
    getTipoMedioPago,
    getTipoMedioPagoById,
    createTipoMedioPago,
    updateTipoMedioPago,
    deleteTipoMedioPago,
};

