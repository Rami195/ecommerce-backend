const express = require('express');
const router = express.Router();

// Importa las funciones del controlador
const { getCategorias, createCategoria, updateCategoria, deleteCategoria } = require('../controllers/categoria.controller');



// Ruta para crear una nueva categoría
router.post('/', createCategoria);
router.get('/', getCategorias);
router.delete('/:id',deleteCategoria);
router.put('/:id', updateCategoria);

module.exports = router;
