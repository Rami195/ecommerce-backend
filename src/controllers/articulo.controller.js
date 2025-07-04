const prisma = require('../prismaClient'); // Importa el cliente de Prisma para interactuar con la base de datos

//GET
exports.getArticulos = async (req, res) => {
  try {
    const articulos = await prisma.articulo.findMany({
      include: { categorias: true } //incluye las categortias asociadas
    }); // Obtiene todos los artículos de la base de datos
    res.json(articulos); // Envía los artículos como respuesta en formato JSON
  } catch (error) {
    console.error('Error al obtener artículos:', error);
    res.status(500).json({ error: 'Error al obtener artículos' });
  }
}
//GET 1 ARTICULO
exports.getByArticulo = async (req, res) => {
  try {
    const codArticulo = parseInt(req.params.id)
    const art = await prisma.articulo.findUnique({
      where: {
        codArticulo,
        fechaBajaArticulo: null
      }
    })
    if(!art){
      res.status(404).json({error:'El articulo no se ha encontrado'})
    }
    res.json(art)

  } catch (error) {
    console.error('Error al obtener artículos:', error);
    res.status(500).json({ error: 'Error al obtener artículos' });
  }
}
//CREATE
exports.createArticulo = async (req, res) => { //ruta del art
  try {
    const { nombreArticulo, descripcion, stock, precio, codCategoria } = req.body //lo que envia el cliente

    const nuevoArt = await prisma.articulo.create({ //nuevo articulo
      data: {
        nombreArticulo,
        descripcion,
        stock,
        precio,
        categorias: {
          connect: codCategoria.map(id => ({ codCategoria: id }))
        }
      }
    })
    res.status(201).json(nuevoArt) //status 201 es creado correctamente
  } catch (error) {
    console.error('Error al crear el articulo', error)
    res.status(500).json({ error: 'Error al crear el articulo' })
  }
}

exports.updateArticulo = async (req, res) => {
  try {
    const codArticulo = parseInt(req.params.id);
    const { nombreArticulo, descripcion, stock, precio, categorias } = req.body;

    const existe = await prisma.articulo.findUnique({
      where: { codArticulo }
    });
    if (!existe) {
      return res.status(404).json({ error: 'Articulo no encontrado' });
    }

    const artActualizado = await prisma.articulo.update({
      where: { codArticulo },
      data: {
        nombreArticulo,
        descripcion,
        stock,
        precio,
        categorias: {
          set: categorias.map(id => ({ codCategoria: id }))
        }
      }
    });

    res.status(200).json(artActualizado);
  } catch (error) {
    console.error('Error al modificar el articulo:', error);
    res.status(500).json({ error: 'Error al modificar el articulo' });
  }
};


//DELETE

exports.deleteArticulo = async (req, res) => {
  try {
    const codArticulo = parseInt(req.params.id)
    const artEliminado = await prisma.articulo.update({
      where: { codArticulo },
      data: {
        fechaBajaArticulo: new Date()
      }
    })
    res.status(200).json({
      message: 'Articulo desactivado correctamente',
      articulo: artEliminado,
    });
  } catch (error) {
    console.error('Error al eliminar el articulo:', error);
    res.status(500).json({ error: 'Error al eliminar el articulo' });
  }
}