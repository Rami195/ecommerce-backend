const express = require('express');
const router = express.Router();

// Importa las funciones del controlador
const { getCategorias, createCategoria } = require('../controllers/categoria.controller');



// Ruta para crear una nueva categoría
router.post('/', createCategoria);

module.exports = router;
