import { prisma } from "../db.js";

export const listar = async (req, res, next) => {
	try {
		const categories = await prisma.ciudad.findMany({
			// include: {
			// 	products: true,
			// },
		});
		res.json(categories);
	} catch (error) {
		next(error);
	}
}