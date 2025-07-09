const prisma = require('../prismaClient');

// Crear nuevo RolUsuario

const createRolUsuario = async (req,res) =>{
    console.log('Body recibido:', req.body);
    const {nombreRolUsuario, permisoUsuario} = req.body;

    try {
        const existe = await prisma.rolUsuario.findUnique({
            where:{
                nombreRolUsuario
            }
        })
        if (existe) {
            return res.status(400).json({ error:'Este mail ya esta registrado'})
        }

        const nuevoRol = await prisma.rolUsuario.create({
            data:{
                nombreRolUsuario,
                permisoUsuario: Array.isArray(permisoUsuario)
                  ? permisoUsuario
                  : [permisoUsuario],
            },
        });

        res.status(201).json({mensaje:'Rol Usuario Creado correctamente', rolUsuario: nuevoRol})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al crear el rol usuario.' });        
    }
};

//obtener todos los roles usuarios

const getRolesUsuario = async (req,res) =>{
    
    try {
        const rolesUsuario = await prisma.rolUsuario.findMany({
            where:{
                fechaHoraBajaRol:null
            },
        });

        res.json(rolesUsuario);

    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los roles del usuario.' });        
    }
};

//obtener rol por id

const getRolesUsuarioById = async (req,res) => {
    const {id} = req.params;
    try {
        const rolUsuarioId = await prisma.rolUsuario.findFirst({
            where:{
                codRolUsuario: parseInt(id),
                fechaHoraBajaRol: null
            },
        });
        if (!rolUsuarioId) {
            return res.status(404).json({error: 'Rol usuario no encontrado'});
        }

    res.json(rolUsuarioId);

    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el rol del usuario.' });                
    }
};

//Modificar rol usuario

const updateRolUsuario = async (req,res) => {
    const {id} = req.params;
    const {nombreRolUsuario,permisoUsuario} = req.body;

    try {
        const rolUsuarioActualizado = await prisma.rolUsuario.update({
            where: {
                codRolUsuario: parseInt(id),
            },
            data:{
                nombreRolUsuario,
                permisoUsuario: Array.isArray(permisoUsuario)
                  ? permisoUsuario
                  : [permisoUsuario],
            },
        });

        res.status(201).json(rolUsuarioActualizado);

    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el rol del usuario.' });                        
    }
};

//Eliminar Rol Usuario

const deleteRolUsuario = async (req,res) =>{
    const {id} = req.params;

    try {

        const rolUsuarioExistente = await prisma.rolUsuario.findFirst({
            where: {
                codRolUsuario: parseInt(id),
                fechaHoraBajaRol: null
            },
        });

        if (!rolUsuarioExistente) {
            return res.status(404).json({ error: 'Rol de usuario no encontrado o ya dado de baja' });
        }


        const bajaRolUsuario = await prisma.rolUsuario.update({
            where:{
                codRolUsuario: parseInt(id)
            },
            data: {
                fechaHoraBajaRol: new Date()
            },
        });

        res.status(200).json({mensaje:'Rol Usuario dado de baja.', rolUsuario: bajaRolUsuario});

    } catch (error) {
        res.status(500).json({ error: 'Error al dar de baja el rol del usuario.' });                                
    }
}

module.exports = {
    createRolUsuario,
    getRolesUsuario,
    getRolesUsuarioById,
    updateRolUsuario,
    deleteRolUsuario,
}