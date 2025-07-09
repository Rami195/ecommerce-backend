const prisma = require('../prismaClient');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const registroUsuarioCliente = async (req, res) => {
    const {
        nombreUsuario,
        emailUsuario,
        contraseñaUsuario,
        codRolUsuario,
        nombreCliente,
        dni,
        telefono,
        calle,
        ciudad,
        localidad,
        pais,
        codigoPostal
    } = req.body;

    try {
        // vefificar si el mail ya esta registrado
        const existe = await prisma.usuario.findUnique({
            where: { emailUsuario }
        });
        if (existe) {
            return res.status(400).json({ error: 'Este mail ya esta registrado' });
        }

        //Encriptar la contraseña
        const hash = await bcrypt.hash(contraseñaUsuario, 10);

        //Generar token verificacion
        const tokenVerificacion = uuidv4();

    
        // Crear usuario, cliente y dirección dentro de una única transacción
        const [nuevoUsuario, nuevoCliente, nuevaDireccion] = await prisma.$transaction(async (tx) => {
            const usuario = await tx.usuario.create({
                data: {
                    nombreUsuario,
                    emailUsuario,
                    contraseñaUsuario: hash,
                    codRolUsuario,
                    activo: true,
                    verificado: false,
                    tokenVerificacion
                }
            });

            const cliente = await tx.cliente.create({
                data: {
                    nombreCliente,
                    dni,
                    telefono,
                    codUsuario: usuario.codUsuario
                }
            });

            const direccion = await tx.direccion.create({
                data: {
                    calle,
                    ciudad,
                    localidad,
                    pais,
                    codigoPostal,
                    codCliente: cliente.codCliente
                }
            });

            return [usuario, cliente, direccion];
        });


        // respuesta
        res.status(201).json({
            mensaje: 'Usuario, cliente y direccion creados correctamente. Verifique su email',
            usuario: {
                codUsuario: nuevoUsuario.codUsuario,
                emailUsuario: nuevoUsuario.emailUsuario,
                activo: nuevoUsuario.activo,
                verificado: nuevoUsuario.verificado,
                tokenVerificacion: nuevoUsuario.tokenVerificacion,
            },
            cliente: nuevoCliente,
            direccion: nuevaDireccion
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al registrar usuario, cliente y direccion' });
    }
};

module.exports = {
    registroUsuarioCliente,
};