const express = require('express');
const router = express.Router();

// Importa las funciones del controlador
const { getTipoMedioPago,getTipoMedioPagoById, createTipoMedioPago, updateTipoMedioPago, deleteTipoMedioPago } = require('../controllers/tipoMedioPago.controlller');



// Ruta para crear una nueva categoría
router.post('/', createTipoMedioPago);
router.get('/', getTipoMedioPago);
router.get('/:id', getTipoMedioPagoById);
router.delete('/:id',deleteTipoMedioPago);
router.put('/:id', updateTipoMedioPago);

module.exports = router;