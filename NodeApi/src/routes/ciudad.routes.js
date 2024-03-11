import { Router } from "express";
const router = Router();
import { listar } from "../controllers/CiudadesControllers.js";

router.get("/listar",listar );

export default router;