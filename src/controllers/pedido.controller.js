const prisma = require('../prismaClient')

//CREATE Pedido
exports.createPedido = async (req,res)=>{
    try{
        const {impuestoSobreVenta,envioGratuito, montoTotal, codCliente, codEstado, codCarrito}=req.body
        
        //Validacion cliente
        const cliente = await prisma.cliente.findUnique({
            where: codCliente,
            fechaHoraBajaCliente: null
            
        })
        if(!cliente){
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        //Validacion estado
        const estado=prisma.estadoPedido.findUnique({
            where: codEstado,
            fechaHoraBajaEP: null
        })
        if(!estado){
            return res.status(404).json({ error: 'Estado no encontrado' });
        }

         //Validacion carrito
        const carrito=prisma.carritoCompras.findUnique({
            where: codCarrito
        })
        if(!carrito){
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }

        
        

        const nuevoPedido = await prisma.pedido.create({
            data: {
                impuestoSobreVenta,
                envioGratuito,
                montoTotal,
                codCliente, 
                codEstado, 
                codCarrito
            
            }
        })

        res.status(201).json(nuevoPedido)
    }catch(error){
        console.error({error: "Error al crear el pedido"})
        res.status(500).json({error: "Error al crear el pedido"})
    }

}