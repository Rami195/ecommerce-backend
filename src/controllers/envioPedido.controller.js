const prisma = require('../prismaClient');
const { get } = require('../routes/articulo.routes');

// obtener todos los enios de pedidos activos

const getEnviosPedidos = async (req, res) => {
    try {
        const enviosPedidos = await prisma.envioPedido.findMany({
            where: {
                fechaHoraBjEnvioPedido: null,
            },
            include: {
                estadoEnvio: true,
                direccion: true,
            }
        });
        res.json(enviosPedidos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los envíos de pedidos.' });
    }
};

// obtener un envio de pedido por id

const getEnviosPedidosById = async (req,res) => {
    const {id} = req.params;

    try {
        const envioPedido = await prisma.envioPedido.findFirst({
            where: {
                codEnvio: parseInt(id),
                fechaHoraBjEnvioPedido: null,
            },
            include: {
                estadoEnvio: true,
                direccion: true,
            }
        });
        res.json(envioPedido);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el envío de pedido.' });
    }
};

// Crear Envio Pedido

const createEnvioPedido = async (req,res) =>{
    const {empresaEnvio, costoEnvio, codigoSeguimiento, fechaSalida, fechaEntregaEstimada, codEstadoEnvio, codigoDireccion} = req.body;
    try {
        const existe = await prisma.envioPedido.findFirst({
            where: { codigoSeguimiento: parseInt(codigoSeguimiento) }
        });
        if (existe) {
            return res.status(400).json({ error: 'Este código de seguimiento ya está vinculado a un envío.' });
        }

        const nuevoEnvioEstado = await prisma.envioPedido.create({
            data: {
                empresaEnvio,
                costoEnvio,
                fechaSalida,
                fechaEntregaEstimada,
                codEstadoEnvio,
                codigoDireccion,
            },
            include: {
                estadoEnvio: true,
                direccion: true,
            }
        });
        res.status(201).json(nuevoEnvioEstado);
    } catch (error) {
        console.error('Error al crear el envio pedido:', error);
        res.status(500).json({ error: 'Error al crear el envio pedido.' });
    }
}

// Actualizar Envio Pedido

const updateEnvioPedido = async (req,res) =>{
    const {empresaEnvio, costoEnvio, fechaSalida, fechaEntregaEstimada, codEstadoEnvio, codigoDireccion} = req.body;
    const {id} = req.params;
    try {
        const existe = await prisma.envioPedido.findFirst({
            where: { codEnvio: parseInt(id) }
        });
        if (!existe) {
            return res.status(400).json({ error: 'Este pedido no se encuentra.' });
        }

        const EnvioEstadoActualizado = await prisma.envioPedido.update({
            where: {
                codEnvio: parseInt(id),
            },
            data: {
                empresaEnvio,
                costoEnvio,
                fechaSalida,
                fechaEntregaEstimada,
                codEstadoEnvio,
                codigoDireccion,
            },
            include: {
                estadoEnvio: true,
                direccion: true,
            }
        });
        res.status(201).json(EnvioEstadoActualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el envio pedido.' });
    }
}

// Eliminar Envio Pedido, baja logica

const deleteEnvioPedido = async (req,res) => {
    const {id} = req.params;
    try {
        const existe = await prisma.envioPedido.findUnfindFirstique({
            where: { 
                codEnvio: parseInt(id),
                fechaEntregaBaja: null,
            }
        });
        if (!existe) {
            return res.status(400).json({ error: 'Este envio pedido no se encuentra.' });
        }

        const envioPedidoBaja = await prisma.envioPedido.update({
            where: {
                codEnvio: parseInt(id),
            },
            data: {
                fechaEntregaBaja: new Date(),
            }
        });

        res.status(200).json({
            mensaje: 'Envio de pedido dado de baja correctamente',
            envioPedido: envioPedidoBaja
        });

    } catch (error) { 
        res.status(500).json({ error: 'Error al dar de baja el envio pedido.' });
    }
};

module.exports = {
    getEnviosPedidos,
    getEnviosPedidosById,
    createEnvioPedido,
    updateEnvioPedido,
    deleteEnvioPedido,
};