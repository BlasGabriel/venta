import { Router } from "express";
const router = Router();
import { listar,listarId } from "../controllers/ProductosControllers.js";

router.get("/listar",listar );
router.get("/listar/:id",listarId );

export default router;