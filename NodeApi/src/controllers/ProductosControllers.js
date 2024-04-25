import { prisma } from "../db.js";

//El controller de producto se creo en modo de prueba
//tendra las funcion de listar
export const listar = async (res, next) => {
    try {
        const products = await prisma.producto.findMany();
        res.json(products);
    } catch (error) {
        next(error);
    }
}
