const express = require('express');
const router = express.Router();

// Importa las funciones del controlador
const { getEnviosPedidos,getEnviosPedidosById, createEnvioPedido, updateEnvioPedido, deleteEnvioPedido } = require('../controllers/envioPedido.controller');



// Ruta para crear una nueva categoría
router.post('/', createEnvioPedido);
router.get('/', getEnviosPedidos);
router.get('/:id', getEnviosPedidosById);
router.delete('/:id',deleteEnvioPedido);
router.put('/:id', updateEnvioPedido);

module.exports = router;