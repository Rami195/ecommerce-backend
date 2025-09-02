const express = require('express'); //Importa express para crear el router
const router = express.Router(); //Crea un nuevo router de Express
const authenticate = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const { getArticulos, createArticulo,updateArticulo,deleteArticulo } = require('../controllers/articulo.controller'); //Importa los controladores para manejar las rutas

// Solo admin puede crear, editar y eliminar
router.post('/', authenticate, authorize('agregarArticulo'), createArticulo);
router.put('/:id', authenticate, authorize('editarArticulo'), updateArticulo);
router.delete('/:id', authenticate, authorize('eliminarArticulo'), deleteArticulo);

// Cualquiera puede ver los artículos
router.get('/', getArticulos); 



module.exports = router; //Exporta el router para que pueda ser utilizado en otros archivos