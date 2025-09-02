const prisma = require('../prismaClient');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { emailUsuario, contraseñaUsuario } = req.body;
  try {
    const usuario = await prisma.usuario.findUnique({
      where: { emailUsuario },
      include: { rolUsuario: true }
    });
    if (!usuario) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }
    const valido = await bcrypt.compare(contraseñaUsuario, usuario.contraseñaUsuario);
    if (!valido) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }
    // Generar token JWT
    const token = jwt.sign(
      {
        codUsuario: usuario.codUsuario,
        emailUsuario: usuario.emailUsuario,
        rolUsuario: usuario.rolUsuario,
      },
      'tu_clave_secreta', // Cambia esto por una clave segura en producción
      { expiresIn: '1h' }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

module.exports = { login };