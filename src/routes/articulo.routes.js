const express = require('express'); //Importa express para crear el router
const router = express.Router(); //Crea un nuevo router de Express

const { getArticulos, createArticulo,updateArticulo,deleteArticulo } = require('../controllers/articulo.controller'); //Importa los controladores para manejar las rutas


router.get('/', getArticulos); 
router.post('/', createArticulo); 
router.put('/:id',updateArticulo);
router.delete('/:id',deleteArticulo);


module.exports = router; //Exporta el router para que pueda ser utilizado en otros archivos