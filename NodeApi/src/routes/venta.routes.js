import { Router } from "express";
const router = Router();
import { insertar, eliminar } from "../controllers/VentasControllers.js";

router.post("/insertar", insertar);
// router.put("/editar/:id", editar);
router.patch("/eliminar/:id", eliminar);

export default router
