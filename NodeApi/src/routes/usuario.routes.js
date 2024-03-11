import { Router } from "express";
const router = Router();
import { insertarUsuario, buscarUsuarioActivo } from "../controllers/UsuarioControllers.js";

router.post("/crear",insertarUsuario );
router.post("/login",buscarUsuarioActivo );


export default router;