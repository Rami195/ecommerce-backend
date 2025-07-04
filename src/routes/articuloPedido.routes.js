const express = require('express')
const router = express.Router()

const {createPedido} = require('../controllers/articuloPedido.controller') 

router.post('/',createPedido);

module.exports = router