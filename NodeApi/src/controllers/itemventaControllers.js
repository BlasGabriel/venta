import { prisma } from "../db.js";

//listar de item venta
export const listar = async (req, res, next) => {
    try {
        const items = await prisma.item_venta.findMany();
        res.json(items);
    } catch (error) {
        next(error);
    }
}

//crear item venta
export const insertar = async (req, res, next) => {
    try {
        const { id_venta, id_producto, cantidad, precio_unitario, monto_iva} = req.body;
        const item = await prisma.item_venta.create({
            data: {
                id_venta: id_venta,
                id_producto: id_producto,
                cantidad: cantidad,
                precio_unitario: precio_unitario,
                monto_iva: monto_iva
            }
        });
        res.json(item);
    } catch (error) {
        next(error);
    }
}

//actualizar item venta
export const actualizar = async (req, res, next) => {
    try {
        const { id_item_venta, id_venta, id_producto, cantidad, precio_unitario, monto_iva} = req.body;
        const item = await prisma.item_venta.update({
            where: {
                id_item_venta: id_item_venta
            },
            data: {
                id_venta: id_venta,
                id_producto: id_producto,
                cantidad: cantidad,
                precio_unitario:precio_unitario,
                monto_iva: monto_iva
            }
        });
        res.json(item);
    } catch (error) {
        next(error);
    }
}

//eliminar item venta
export const eliminar = async (req, res, next) => {
    try {
        const { id_item_venta } = req.body;
        const item = await prisma.item_venta.delete({
            where: {
                id_item_venta: id_item_venta
            }
        });
        res.json(item);
    } catch (error) {
        next(error);
    }
}

