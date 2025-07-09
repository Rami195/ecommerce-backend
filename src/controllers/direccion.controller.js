const prisma = require('../prismaClient');

//obtener todos las direcciones

const getDirecciones = async (req,res) =>{
    try {
        const direcciones = await prisma.direccion.findMany({
            where: {
                fechaHoraBajaDireccion: null,
            }
        });

        res.json(direcciones)
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las direcciones'})
    }
};

//obtener una direccion

const getDireccionById = async (req,res) => {
    const{id} = req.params;

    try {
        const dir = await prisma.direccion.findFirst({
            where: {
                codigoDireccion: parseInt(id),
                fechaHoraBajaDireccion: null
            },
        });

        if (!dir) {
            return  res.status(404).json({ error: 'Direccion no encontrada no encontrada'});
        }

        res.json(dir)

    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la direccion' })
    }
};

// crear dirreccion

const createDireccion = async (req,res) => {
    const{calle,ciudad,localidad,pais,codigoPostal, codCliente} = req.body

    try {
        const nuevaDireccion = await prisma.direccion.create({
            data:{
                calle,
                ciudad,
                localidad,
                pais,
                codigoPostal,
                codCliente
            },
        });

        res.status(201).json(nuevaDireccion);

    } catch (error) {
        res.status(500).json({ error: 'Error al crear la direccion.' });       
    }
}; 

//actualizar una direccion

const updateDireccion = async (req,res) => {
    const{id} = req.params;
    const{calle,ciudad,localidad,pais,codigoPostal} = req.body;

    try {
        const direccionActualizada = await prisma.direccion.update({
            where: {
                codigoDireccion: parseInt(id)
            },

            data: {
                calle,
                ciudad,
                localidad,
                pais,
                codigoPostal
            },

        });

        res.status(200).json(direccionActualizada);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la direccion.' });       
    }
};

//Eliminar Direccion

const deleteDireccion = async (req, res) => {
    const { id } = req.params;

    try {
        // Primero verificamos si existe y no fue dada de baja
        const direccionExistente = await prisma.direccion.findFirst({
            where: {
                codigoDireccion: parseInt(id),
                fechaHoraBajaDireccion: null
            }
        });

        if (!direccionExistente) {
            return res.status(404).json({ error: 'Dirección no encontrada o ya dada de baja' });
        }

        // Si existe, hacemos la baja lógica
        const bajaDireccion = await prisma.direccion.update({
            where: {
                codigoDireccion: parseInt(id)
            },
            data: {
                fechaHoraBajaDireccion: new Date()
            }
        });

        res.status(200).json({ mensaje: 'Dirección dada de baja.', direccion: bajaDireccion });

    } catch (error) {
        res.status(500).json({ error: 'Error al dar de baja la dirección' });
    }
};


module.exports = {
    getDirecciones,
    getDireccionById,
    createDireccion,
    updateDireccion,
    deleteDireccion,
};

