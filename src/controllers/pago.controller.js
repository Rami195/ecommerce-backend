const prisma = require('../prismaClient');

// Obtener todos los Pagos

const getPagos = async (req,res) => {
    try {
        const pagos = await prisma.pago.findMany({
            include:{
                tipoMedioPago: true,
                estadoPago: true,
            }
        });
        res.json(pagos);

    } catch (error) {
        res.status(500).json({error: 'Error al obtener los pagos.'});
    }
};

// obtener un pago por id

const getPagoByID = async(req, res) => {
    const {id} = req.params;

    try {
        const pago = await prisma.pago.findUnique({
            where:{
                codPago: parseInt(id), 
            },
            include: {
                tipoMedioPago: true,
                estadoPago: true,
            }
        });
        if (!pago) {
            return res.status(404).json({error:'Pago no encontrado'});
        }
        return res.json(pago);
    } catch (error) {
        res.status(500).json({error: 'Error al obtener el pago'})
    }
};

// crear Pago

const createPago = async (req,res) => {
    const{montoPagado, transaccionId, codTipoMedioPago,codEstadoPago} = req.body;

    try {
        const existePago = await prisma.pago.findFirst({
            where: {transaccionId}
        });

        if (existePago) {
            return res.status(400).json({error: 'Este pago ya esta vinculado a una transaccion'});
        }

        const nuevoPago = await prisma.pago.create({
            data:{
                montoPagado,
                transaccionId,
                fechaHoraPago: new Date(),
                codTipoMedioPago,
                codEstadoPago,
            }
        });
        res.status(201).json(nuevoPago);

    } catch (error) {
        console.error('Error al crear el pago:', error);
        res.status(500).json({error:'Error al crear el pago'});
    }
};

// modificar el pago

const updatePago = async(req,res) => {
    const {id} = req.params;
    const {montoPagado,codEstadoPago} = req.body;

    try {
        const pagoActualizado = await prisma.pago.update({
            where: {
                codPago:parseInt(id)
            },
            data: {
                montoPagado,
                codEstadoPago,
            }
        });

        res.status(200).json(pagoActualizado)
    } catch (error) {
        res.status(500).json({ error:'Error al actualizar el pago'});
    }
};

// Eliminar pago, solo para etapa de desarrollo para hacer pruebas

const deletePago = async(req,res) => {
    const {id} = req.params;

    try {
        const pagoExistente = await prisma.pago.findFirst({
            where: {
                codPago: parseInt(id),
            }
        });

        if (!pagoExistente) {
            return res.status(404).json({ error: 'Pago no encontrado o ya eliminado'})
        }

        const pagoEliminado = await prisma.pago.delete({
            where:{
                codPago: parseInt(id)
            }
        });
        
        res.status(200).json({mensaje: 'Pago dado de baja.', pago: pagoEliminado});
    } catch (error) {
        res.status(500).json({error: 'Error al eliminar el pag'});
    }
};

module.exports ={
    getPagos,
    getPagoByID,
    createPago,
    updatePago,
    deletePago,
};