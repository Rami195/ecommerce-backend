const {v4: uuidv4 } = require('uuid');
const prisma = require('../prismaClient');
const bcrypt = require('bcrypt');

// crear un nuevo usuario

const createUsuario = async (req,res) => {
    const{nombreUsuario,emailUsuario,contraseñaUsuario,codRolUsuario} = req.body;

    try {
        const existe = await prisma.usuario.findUnique({
            where:{emailUsuario}
        })
        if (existe) {
            return res.status(400).json({ error:'Este mail ya esta registrado'})
        }

        //hashear la contraseña
        const hash = await bcrypt.hash(contraseñaUsuario, 10);

        //Generar token de verificacion
        const tokenVerificacion = uuidv4();

        const nuevoUsuario = await prisma.usuario.create({
            data: {
                nombreUsuario,
                emailUsuario,
                contraseñaUsuario: hash,
                codRolUsuario,
                activo: true, // por defecto se activa
                verificado: false, // no verificado aun
                tokenVerificacion 
            },
        });

        //Enviar mail con token verificacion falta hacer, se hara mas tarde

        res.status(201).json({
            mensaje: 'Usuario creado correctamente. Verifique su email',
            usuario: nuevoUsuario
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al crear el usuario.' });
    }
};

//obtener todos los usuarios

const getUsuarios = async (req,res) => {
    try {
        const usuarios = await prisma.usuario.findMany({
            include: {
                rolUsuario: true,
                cliente: true
            },
        });
        
        res.json(usuarios);

    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios '})
    }
};

// obterner un usuario por id

const getUsuarioById = async (req,res) => {
    const { id } = req.params;
    try {
        const usuario = await prisma.usuario.findUnique({
            where: {
                codUsuario: parseInt(id),
            },
            include: {
                rolUsuario: true,
                cliente: true,
            },
        });

        if (!usuario) {
            return res.status(404).json({ error:'Usuario no encontrado'});
        }

        res.json(usuario);

    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario.' });
    }
};

// Modificar un usuario

const updateUsuario = async (req,res) => {
    const { id } = req.params;
    const { nombreUsuario,emailUsuario,contraseñaUsuario } = req.body;

    try {
        const UsuarioActualizado = await prisma.usuario.update({
            where: {
                codUsuario: parseInt(id)
            },
            data: {
                nombreUsuario,
                emailUsuario,
                contraseñaUsuario,
            },
        });

        res.status(201).json(UsuarioActualizado);

    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario.' });
    }
};

// eliminar Usuario

/*
const deleteUsuario = async (req,res) => {
    const { id } = req.params;
    const usuarioEliminado 
}
*/