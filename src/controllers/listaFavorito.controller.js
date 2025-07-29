const prisma = require('../prismaClient');

// Obtener listas de favoritos por cliente
const getListasPorCliente = async (req, res) => {
  const { codCliente } = req.params;

  try {
    const listas = await prisma.listaFavorito.findMany({
      where: {
        codCliente: parseInt(codCliente)
      },
      include: {
        articulos: { include: { articulo: true } } // trae los artículos 
      }
    });
    res.json(listas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener listas' });
  }
};

// Obtener listas por cliente y id de lista
const getListasPorClienteyID = async (req, res) => {
  const { codCliente, codListaFavorito } = req.params;

  try {
    const lista = await prisma.listaFavorito.findFirst({
      where: {
        codCliente: parseInt(codCliente),
        codListaFavorito: parseInt(codListaFavorito)
      },
      include: {
        articulos: { include: { articulo: true } } // trae los artículos 
      }
    });
    res.json(lista);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la lista' });
  }
};



// Crear una nueva lista de favoritos
const createListaFavoritos = async (req, res) => {
  const { nombre, codCliente } = req.body;

  try {
    const nuevaLista = await prisma.listaFavorito.create({
      data: {
        nombre,
        codCliente,
      }
    });
    res.status(201).json(nuevaLista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la lista de favoritos' });
  }
};

// Editar una lista de favoritos
const updateListaFavoritos = async (req, res) => {
  const { nombre } = req.body;
  const {id} = req.params;
  try {
    
    const existe = await prisma.listaFavorito.findFirst({
            where: { 
                codListaFavorito: parseInt(id),
            }
        });
        if (!existe) {
            return res.status(400).json({ error: 'Esta lista no se encuentra.' });
        }

    const listaActualizada = await prisma.listaFavorito.update({
        where: {
            codListaFavorito: parseInt(id)
        },
      data: {
        nombre,
      }
    });
    res.status(201).json(listaActualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la lista de favoritos' });
  }
};


// Eliminar una lista de favoritos
const deleteListaFavoritos = async (req, res) => {
  const { id } = req.params;

  try {
    const existe = await prisma.listaFavorito.findFirst({
            where: { 
                codListaFavorito: parseInt(id),
            }
        });
        if (!existe) {
            return res.status(400).json({ error: 'Esta lista no se encuentra.' });
        }
    
    const bajaLista = await prisma.listaFavorito.delete({
      where: {
        codListaFavorito: parseInt(id)
      }
    });
    res.json({ mensaje: 'Lista eliminada correctamente',listaFavorito:bajaLista });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la lista' });
  }
};

module.exports = {
  createListaFavoritos,
  getListasPorCliente,
  getListasPorClienteyID,
  updateListaFavoritos,
  deleteListaFavoritos
};
