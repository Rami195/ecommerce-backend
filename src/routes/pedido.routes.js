const express = require('express')
const router = express.Router()

const {createPedido} = require('../controllers/pedido.controller') 

router.post('/',createPedido);

module.exports = router