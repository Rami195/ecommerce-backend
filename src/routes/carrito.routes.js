const express = require('express')
const router = express.Router()

const {updateCarrito, getCarrito,getCarritoByID} = require('../controllers/carrito.controller') 

router.put('/:id', updateCarrito)
router.get('/', getCarrito)
router.get('/:id', getCarritoByID)
module.exports = router