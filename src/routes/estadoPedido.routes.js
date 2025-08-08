const express = require('express');
const router = express.Router();

// Importa las funciones del controlador
const { 
    getEstadoPedido,
    getEstadoPedidoById,
    createEstadoPedido,
    updateEstadoPedido,
    deleteEstadoPedido
} = require('../controllers/estadoPedido.controller');

// Ruta para crear un nuevo estado de pedido
router.post('/', createEstadoPedido);
router.get('/', getEstadoPedido);
router.get('/:id', getEstadoPedidoById);
router.delete('/:id', deleteEstadoPedido);
router.put('/:id', updateEstadoPedido);

module.exports = router;