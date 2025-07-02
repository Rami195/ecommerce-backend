const express = require('express'); //Importa express para crear el router
const router = express.Router(); 
const { getUsuarios,getUsuarioById ,createUsuario, updateUsuario  } = require('../controllers/usuario.controller');

router.post('/', createUsuario);
router.get('/', getUsuarios);
router.get('/:id', getUsuarioById);
router.put('/:id', updateUsuario);

module.exports = router;