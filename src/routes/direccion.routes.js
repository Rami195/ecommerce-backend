const express = require('express');
const router = express.Router();

// Importa las funciones del controlador
const { getDirecciones,getDireccionById, createDireccion, updateDireccion, deleteDireccion } = require('../controllers/direccion.controller');



// Ruta para crear una nueva categoría
router.post('/', createDireccion);
router.get('/', getDirecciones);
router.get('/:id', getDireccionById);
router.delete('/:id',deleteDireccion);
router.put('/:id', updateDireccion);

module.exports = router;