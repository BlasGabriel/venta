import { prisma } from "../db.js";

export const listar = async (req, res, next) => {
    try {
        const ventas = await prisma.venta.findMany({
            include: {
                cliente: true,
                deposito: true,
                usuario: true
            }
        });
        res.json(ventas);
    } catch (error) {
        next(error);
    }
}

export const listarId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const venta = await prisma.venta.findUnique({
            where: { id },
            include: {
                cliente: true,
                deposito: true,
                usuario: true
            }
        });
        res.json(venta);
    } catch (error) {
        next(error);
    }
}

export const insertar = async (req, res, next) => {
    try {
        const { id_cliente, fecha, total, estado,id_usuario,id_deposito,tipo_operacion,descuento,subtotal,total_iva,productos,fecha_anulacion } = req.body;
      

        const venta = await prisma.venta.create({
            data: {
                id_cliente,
                fecha: fecha,
                fecha_anulacion: new Date( fecha_anulacion),
                total,
                estado,
                id_usuario,
                id_deposito,
                tipo_operacion: parseInt(tipo_operacion),
                descuento,
                subtotal,
                total_iva
            }
        });

       /* for(product of productos){
            const productExist = await prisma.producto.findUnique({
                where: {
                    id: product.id
                }
            })
        }*/

        productos.map(async (product) => {
            const productExist = await prisma.producto.findUnique({
                where: {
                    id_producto: product.id_producto
                }
            })
            if(!productExist){
                throw new Error(`El producto ${product.id} no existe`)
            }if(product.cantidad > productExist.stock){
                throw new Error(`El producto ${product.id} no tiene stock suficiente`)
            }
            // console.log(product)
           const item_venta = await prisma.item_venta.create({
                data: {
                    id_venta: venta.id_venta,
                    id_producto: product.id_producto,
                    cantidad: product.quantity,
                    precio_unitario: product.precio_venta_maximo,
                    monto_iva: product.porcentaje_iva
                }
            })
            console.log(item_venta)

            // await prisma.producto.update({
            //     where: {
            //         id_producto: product.id_producto
            //     },
            //     data: {
            //         stock: {
            //             decrement: product.quantity
            //         }
            //     }
            // })
            
            const stockActual = await prisma.stock.findMany({
                where: {
                    id_producto: product.id_producto
                }
            })
            console.log(stockActual[0])
            const nuevoStock = stockActual[0].cantidad - product.quantity;
            const stock = await prisma.stock.update({
                where: {
                    id_stock: stockActual[0].id_stock,
                    id_producto: product.id_producto
                },
                data: {
                    cantidad: nuevoStock
                }
            });
            
            // if (producto) {
            //     await prisma.producto.update({
            //         where: {
            //             id_producto: product.id_producto
            //         },
            //     });
            // }
            console.log("producto actualizado")
            console.log(stock)
            
        })
        res.json(venta);
    } catch (error) {
        next(error);
    }
}


export const eliminar = async (req, res, next) => {
    try {
        const { id } = req.body;
        const venta = await prisma.venta.update({
            fecha_anulacion: new Date(),
            where: { id }
        });
        res.json(venta);
    } catch (error) {
        next(error);
    }
}