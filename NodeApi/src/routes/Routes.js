import express from "express";
import ciudadesRoutes from "./ciudad.routes.js";
import usuarioRoutes from "./usuario.routes.js";

const router = express.Router();

router.use("/ciudades", ciudadesRoutes);
router.use("/usuario", usuarioRoutes);

export default router;
