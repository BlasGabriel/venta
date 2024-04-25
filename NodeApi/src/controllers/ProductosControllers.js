import { prisma } from "../db.js";

// El controller de producto se creó en modo de prueba
// Tendrá la función de listar
export const listar = async (req, res, next) => {
    try {
        const products = await prisma.producto.findMany({
            include: {
                categoria: true,
                unidad_de_medida: true
            }
        });
        res.json(products);
    } catch (error) {
        next(error);
    }
}
