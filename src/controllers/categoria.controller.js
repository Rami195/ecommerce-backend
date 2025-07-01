const prisma = require('../prismaClient'); // Importa el cliente de Prisma para interactuar con la base de datos

//CREATE CATEGORIA
exports.createCategoria = async (req, res) => {
    try {
        const { nombreCategoria, descripcion } = req.body
        const nuevaCat = await prisma.categoria.create({
            data: {
                nombreCategoria,
                descripcion
            }
        })
        res.status(201).json(nuevaCat)

    } catch (error) {
        console.error('Error al crear la categoria')
        res.status(500).json({ error: 'Error al crear la categoria' })
    }
}

//GET CATEGORIAS
exports.getCategorias = async (req, res) => {
    try {
        const categorias = await prisma.categoria.findMany()
        res.json(categorias)
    } catch (error) {
        console.error('Error al obtener las categorias')
        res.status(500).json({ error: 'Error al obtener las categorias' })
    }
}

//UPDATE CATEGORIA
exports.updateCategoria = async (req, res) => {
    try {
        const codCategoria = parseInt(req.params.id);
        const { nombreCategoria, descripcion } = req.body

        const existe = await prisma.categoria.findUnique({
            where: { codCategoria }
        })
        if (!existe) {
            return res.status(404).json({ error: 'Categoria no encontrada' })
        }

        const categoriaActualizada = await prisma.categoria.update({
            where: { codCategoria },
            data: {
                nombreCategoria,
                descripcion
            }
        })
        res.status(200).json(categoriaActualizada)
    } catch (error) {
        console.error('Error al modificar las categorias')
        res.status(500).json({ error: 'Error al modificar las categorias' })
    }
}


//DELETE 
exports.deleteCategoria = async (req, res) => {
    try {
        const codCategoria = parseInt(req.params.id);
        //Busca articulo relacionado
        const articuloRel = await prisma.articulo.findMany({
            where: {
                categorias: {
                    some: {
                        codCategoria
                    }
                }
            }
        })
        //Si tiene manda el error
        if (articuloRel.length > 0) {
            return res.status(400).json({
                error: 'No se puede eliminar la categoria porque tiene articulos relacionados'
            })
        }

        const categoriaActualizada = await prisma.categoria.update({
            where: { codCategoria },
            data: {
                fechaBajaCategoria: new Date()
            }
        })
        res.status(200).json({
            message: 'Categoría desactivada correctamente',
            categoria: categoriaActualizada,
        });
        
    } catch (error) {
        console.error('Error al eliminar la categoria')
        res.status(500).json({ error: 'Error al eliminar la categoria' })
    }

}