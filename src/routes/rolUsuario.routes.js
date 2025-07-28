const express = require('express'); //Importa express para crear el router
const router = express.Router(); //Crea un nuevo router de Express

const { createRolUsuario, getRolesUsuario, getRolesUsuarioById,updateRolUsuario,deleteRolUsuario } = require('../controllers/rolUsuario.controller'); //Importa los controladores para manejar las rutas

router.post('/', createRolUsuario);
router.get('/', getRolesUsuario);
router.get('/:id', getRolesUsuarioById);
router.put('/:id', updateRolUsuario);
router.delete('/:id', deleteRolUsuario);

module.exports = router;