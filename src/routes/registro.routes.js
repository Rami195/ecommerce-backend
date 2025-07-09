const express = require('express');
const router = express.Router();

const { registroUsuarioCliente } = require('../controllers/registro.controller');

router.post('/', registroUsuarioCliente);

module.exports = router;
