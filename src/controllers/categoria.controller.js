const prisma = require('../prismaClient'); // Importa el cliente de Prisma para interactuar con la base de datos

exports.createCategoria= async(req,res)=>{
    try{
        const {nombreCategoria,descripcion} = req.body
        const nuevaCat = await prisma.categoria.create({
            data:{
                nombreCategoria,
                descripcion
            }
        })
        res.status(201).json(nuevaCat)
        
    }catch(error){
        console.error('Error al crear la categoria')
        res.status(500).json({error: 'Error al crear la categoria'})
    }
}