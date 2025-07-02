const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/cliente.controller');

//Obtener todos los clientes activos
router.get('/', clienteController.getClientes);

//Obtener un cliente por id
router.get('/:id', clienteController.getClienteById);

//Crear un nuevo cliente
router.post('/', clienteController.createCliente);

//Modificar un cliente
router.put('/:id', clienteController.updateCliente);

//Dar baja logica a un cliente
router.delete('/:id', clienteController.deleteCliente);

module.exports = router;