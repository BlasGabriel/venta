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
        const { id_cliente, fecha, total, estado,id_usuario,id_deposito,tipo_operacion,descuento,subtotal,total_iva,productos } = req.body;
        const venta = await prisma.venta.create({
            data: {
                id_cliente,
                fecha,
                total,
                estado,
                id_usuario,
                id_deposito,
                tipo_operacion,
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
                    id: product.id
                }
            })
            if(!productExist){
                throw new Error(`El producto ${product.id} no existe`)
            }if(product.cantidad > productExist.stock){
                throw new Error(`El producto ${product.id} no tiene stock suficiente`)
            }
            await itemVenta.create({
                data: {
                    id_venta: venta.id,
                    id_producto: product.id,
                    cantidad: product.cantidad,
                    precio_unitario: product.precio_maximo,
                    monto_iva: product.monto_iva
                }
            })

            await prisma.producto.update({
                where: {
                    id: product.id
                },
                data: {
                    stock: {
                        decrement: product.cantidad
                    }
                }
            })
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