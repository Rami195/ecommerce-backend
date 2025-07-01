const express = require('express'); //Importa express para crear el router
const router = express.Router(); //Crea un nuevo router de Express

const { getArticulos, createArticulo } = require('../controllers/articulo.controller'); //Importa los controladores para manejar las rutas


router.get('/', getArticulos); //Define la ruta GET para obtener todos los artículos, usando el controlador getArticulos
router.post('/', createArticulo); //Define la ruta POST para crear un nuevo artículo, usando el

module.exports = router; //Exporta el router para que pueda ser utilizado en otros archivos