import { Router } from "express";
import { listar } from "../controllers/CiudadesControllers.js";
const router = Router();

router.get("/listar ",listar );

export default router;