const prisma = require('../prismaClient');


// Obtener todos los artículos de una lista
const getArticulosFavoritos = async (req, res) => {
  const { listaId } = req.params;
  try {
    const articulos = await prisma.listaFavoritoArticulo.findMany({
      where: { listaId: parseInt(listaId) },
      include: {
        articulo: true,
      },
    });
    res.json(articulos.map(fav => fav.articulo));
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener artículos' });
  }
};

// Obtener un articulo en especifico de la lista de favoritos

const getArticuloFavoritoById = async (req, res) => {
  const { listaId, articuloId } = req.params;
  try {
    const articulo = await prisma.listaFavoritoArticulo.findFirst({
      where: { 
            listaId_articuloId: {
                listaId: parseInt(listaId),
                articuloId: parseInt(articuloId),
            },
       },
      include: {
        articulo: true,
      },
    });
    if (!articulo) {
        return res.status(404).json({ error: 'Artículo no encontrado en favoritos' });
        }
    res.json(articulo);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el artículo' });
  }
};

// Agregar artículo a lista de favoritos
const addArticuloAFavoritos = async (req, res) => {
  const { listaId, articuloId } = req.body;
  try {
    const existente = await prisma.listaFavoritoArticulo.findUnique({
          where: {
            listaId_articuloId: {
              listaId,
              articuloId
            }
          }
        });
        if (existente) {
          return res.status(409).json({ error: 'El artículo ya está en la lista de favoritos' });
        }

    const articuloNuevo = await prisma.listaFavoritoArticulo.create({
      data: {
        listaId,
        articuloId,
      },
    });
    res.status(201).json(articuloNuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar artículo' });
  }
};

// Quitar artículo de la lista de favoritos
const deleteArticuloDeFavoritos = async (req, res) => {
  const { listaId, articuloId } = req.params;
  try {
    const existe = await prisma.listaFavoritoArticulo.findFirst({
            where: { 
                listaId_articuloId: {
                    listaId: parseInt(listaId),
                    articuloId: parseInt(articuloId),
                },
            }
        });
        if (!existe) {
            return res.status(400).json({ error: 'Este articulo no se encuentra.' });
        }
        
    const articuloListaEliminado = await prisma.listaFavoritoArticulo.delete({
      where: {
        listaId_articuloId: {
          listaId: parseInt(listaId),
          articuloId: parseInt(articuloId),
        },
      },
    });
    res.status(200).json({ mensaje: 'Artículo eliminado de favoritos', listaFavoritoArticulo: articuloListaEliminado });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar artículo' });
  }
};



module.exports = {
    getArticulosFavoritos,
    getArticuloFavoritoById,
    addArticuloAFavoritos,
    deleteArticuloDeFavoritos,
}