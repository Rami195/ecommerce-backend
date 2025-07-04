const { PrismaClient, Prisma } = require('@prisma/client')
const prisma = new PrismaClient();

async function main(params) {
    const estadosPedido = [
        { nombreEstadoPedido: 'Pendiente' },
        { nombreEstadoPedido: 'Confirmado' },
        { nombreEstadoPedido: 'Enviado' },
        { nombreEstadoPedido: 'Entregado' },
        { nombreEstadoPedido: 'Cancelado' },
        { nombreEstadoPedido: 'Finalizado' }
    ];

    for (const estado of estadosPedido) {
        await prisma.estadoPedido.upsert({
            where: { nombreEstadoPedido: estado.nombreEstadoPedido },
            update: {},
            create: estado,

        })
    }
    console.log('Estados de pedido cargados correctamente.');
}

main()
 .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });