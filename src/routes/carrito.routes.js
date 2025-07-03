const express = require('express')
const router = express.Router()

const {createCarrito} = require('../controllers/carrito.controller') 

router.post('/',createCarrito);

module.exports = router