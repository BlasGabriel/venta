import express from "express";
import ciudadesRoutes from "./ciudad.routes.js";
import usuarioRoutes from "./usuario.routes.js";
import productoRoutes from "./producto.routes.js";

const router = express.Router();

router.use("/ciudades", ciudadesRoutes);
router.use("/usuario", usuarioRoutes);
router.use("/producto", productoRoutes);

export default router;
