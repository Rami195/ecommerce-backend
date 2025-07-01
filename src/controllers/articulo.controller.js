const prisma = require('../prismaClient'); // Importa el cliente de Prisma para interactuar con la base de datos


exports.getArticulos = async (req, res) => {
  try {
    const articulos = await prisma.articulo.findMany({
        include: {categorias:true} //incluye las categortias asociadas
    }); // Obtiene todos los artículos de la base de datos
    res.json(articulos); // Envía los artículos como respuesta en formato JSON
  } catch (error) {
    console.error('Error al obtener artículos:', error); // Registra el error en la consola
    res.status(500).json({ error: 'Error al obtener artículos' }); // Envía un error 500 si ocurre un problema
  }
}

exports.createArticulo = async (req,res)=>{ //ruta del art
    try{
    const {nombreArticulo, descripcion, stock, precio, codCategoria}=req.body //lo que envia el cliente
    const nuevoArt= await prisma.articulo.create({ //nuevo articulo
        data:{
            nombreArticulo,
            descripcion,
            stock,
            precio,
            categorias:{
                connect: codCategoria.map(id=>({codCategoria:id}))
            }
        }
    })
    res.status(201).json(nuevoArt) //status 201 es creado correctamente
    }catch(error){
        console.error('Error al crear el articulo')
        res.status(500).json({error: 'Error al crear el articulo'})
    }
}