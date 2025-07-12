const express = require('express')
const router = express.Router()

const {createPedido,updatePedido, updateEstadoPedido, getPedidos,getPedidoById } = require('../controllers/pedido.controller') 

router.post('/',createPedido);
router.put('/:id', updatePedido);
router.put('/pedido/:id/estado', updateEstadoPedido);
router.get('/:id',getPedidoById);
router.get('/',getPedidos);
module.exports = router