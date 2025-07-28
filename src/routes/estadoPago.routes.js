const express = require('express');
const router = express.Router();

// Importa las funciones del controlador
const { getEstadoPago,getEstadoPagoById, createEstadoPago, updateEstadoPago, deleteEstadoPago } = require('../controllers/estadoPago.controller');



// Ruta para crear una nueva categoría
router.post('/', createEstadoPago);
router.get('/', getEstadoPago);
router.get('/:id', getEstadoPagoById);
router.delete('/:id',deleteEstadoPago);
router.put('/:id', updateEstadoPago);

module.exports = router;