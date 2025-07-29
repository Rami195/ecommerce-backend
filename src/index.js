require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API funcionando 🚀');
});

//Rutas
const articuloRouter= require('./routes/articulo.routes')
const categoriaRouter= require('./routes/categoria.routes')
const clienteRouter= require('./routes/cliente.routes')
const usuarioRouter= require('./routes/usuario.routes')
const rolUsuarioRouter= require('./routes/rolUsuario.routes')
const articuloPedido= require('./routes/articuloPedido.routes')
const pedido = require('./routes/pedido.routes')
const carrito = require('./routes/carrito.routes')
const registro = require('./routes/registro.routes')
const direccion = require('./routes/direccion.routes')
const tipoMedioPago = require('./routes/tipoMedioPago.routes')
const pago = require('./routes/pago.routes')
const estadoPago = require('./routes/estadoPago.routes')
const envioPedido = require('./routes/envioPedido.routes')
const listaFavorito = require('./routes/listaFavorito.routes')
const listaFavoritoArticulo = require('./routes/listaFavoritoArticulo.routes')

app.use('/api/cliente', clienteRouter);
app.use('/api/articulos', articuloRouter);
app.use('/api/categoria',categoriaRouter);
app.use('/api/usuario', usuarioRouter);
app.use('/api/rolUsuario', rolUsuarioRouter);
app.use('/api/articuloPedido', articuloPedido);
app.use('/api/pedido',pedido);
app.use('/api/carrito',carrito);
app.use('/api/registro',registro);
app.use('/api/direccion',direccion);
app.use('/api/tipoMedioPago',tipoMedioPago);
app.use('/api/pago',pago);
app.use('/api/estadoPago',estadoPago);
app.use('/api/envioPedido',envioPedido);
app.use('/api/listaFavorito',listaFavorito);
app.use('/api/listaFavoritoArticulo',listaFavoritoArticulo);


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
