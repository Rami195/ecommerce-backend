const express = require('express');
const router = express.Router();

// Importa las funciones del controlador
const { getEstadoEnvio,getEstadoEnvioById, createEstadoEnvio, updateEstadoEnvio, deleteEstadoEnvio } = require('../controllers/estadoEnvio.controller');



// Ruta para crear una nueva categoría
router.post('/', createEstadoEnvio);
router.get('/', getEstadoEnvio);
router.get('/:id', getEstadoEnvioById);
router.delete('/:id',deleteEstadoEnvio);
router.put('/:id', updateEstadoEnvio);

module.exports = router;