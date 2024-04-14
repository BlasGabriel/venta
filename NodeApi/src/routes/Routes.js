import express from "express";
import ciudadesRoutes from "./ciudad.routes.js";
import usuarioRoutes from "./usuario.routes.js";
import productoRoutes from "./producto.routes.js";
import clienteRoutes from "./cliente.routes.js";
import cobrosRoutes from "./cobro.routes.js";

const router = express.Router();

router.use("/ciudades", ciudadesRoutes);
router.use("/usuario", usuarioRoutes);
router.use("/producto", productoRoutes);
router.use("/clientes", clienteRoutes);
router.use("/cobros", cobrosRoutes);

export default router;
