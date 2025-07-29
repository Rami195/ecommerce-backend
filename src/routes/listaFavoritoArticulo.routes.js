const express = require('express');
const router = express.Router();

// Importa las funciones del controlador
const { getArticulosFavoritos, getArticuloFavoritoById, addArticuloAFavoritos, deleteArticuloDeFavoritos } = require('../controllers/listaFavoritoArticulo.controller');



// Ruta para crear una nueva categoría
router.post('/', addArticuloAFavoritos);
router.get('/', getArticulosFavoritos);
router.get('/:id', getArticuloFavoritoById);
router.delete('/:id',deleteArticuloDeFavoritos);

module.exports = router;