const express = require('express');
const router = express.Router();

// Importa las funciones del controlador
const { getCategorias,getByCategoria, createCategoria, updateCategoria, deleteCategoria } = require('../controllers/categoria.controller');



// Ruta para crear una nueva categoría
router.post('/', createCategoria);
router.get('/', getCategorias);
router.get('/:id', getByCategoria);
router.delete('/:id',deleteCategoria);
router.put('/:id', updateCategoria);

module.exports = router;
