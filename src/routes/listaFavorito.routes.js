const express = require('express');
const router = express.Router();

// Importa las funciones del controlador
const { getListasPorCliente, getListasPorClienteyID, createListaFavoritos, updateListaFavoritos, deleteListaFavoritos } = require('../controllers/listaFavorito.controller');



// Ruta para crear una nueva categoría
router.post('/', createListaFavoritos);
router.get('/:codCliente', getListasPorCliente);
router.get('/:codCliente/:codListaFavorito', getListasPorClienteyID);
router.delete('/:id',deleteListaFavoritos);
router.put('/:id', updateListaFavoritos);

module.exports = router;

