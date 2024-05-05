import express from "express";
import ciudadesRoutes from "./ciudad.routes.js";
import usuarioRoutes from "./usuario.routes.js";
import productoRoutes from "./producto.routes.js";
import clienteRoutes from "./cliente.routes.js";
import cobrosRoutes from "./cobro.routes.js";
import itemCobrosRoutes from "./itemCobro.routes.js";
import ventaRoutes from "./venta.routes.js";

const router = express.Router();

router.use("/ciudades", ciudadesRoutes);
router.use("/usuario", usuarioRoutes);
router.use("/producto", productoRoutes);
router.use("/clientes", clienteRoutes);
router.use("/cobros", cobrosRoutes);
router.use("/itemcobro", itemCobrosRoutes);
router.use("/ventas", ventaRoutes);

export default router;

