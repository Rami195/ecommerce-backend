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

app.use('/api/cliente', clienteRouter);
app.use('/api/articulos', articuloRouter);
app.use('/api/categoria',categoriaRouter);
app.use('/api/usuario', usuarioRouter);
app.use('/api/rolUsuario', rolUsuarioRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
