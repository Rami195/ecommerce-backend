const express = require('express');
const router = express.Router();

// Importa las funciones del controlador
const { getPagos,getPagoByID, createPago, updatePago, deletePago } = require('../controllers/pago.controller');



// Ruta para crear una nueva categoría
router.post('/', createPago);
router.get('/', getPagos);
router.get('/:id', getPagoByID);
router.delete('/:id',deletePago);
router.put('/:id', updatePago);

module.exports = router;