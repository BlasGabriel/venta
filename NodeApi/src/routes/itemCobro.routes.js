import { Router } from "express";
import { 
    listar,
    buscarId,
    buscarCuenta,
    insertar,
    editar,
    eliminar,
    cobrar
} from "../controllers/ItemCobro.js";

const router = Router();

router.get('/listar', listar);
router.get('/listar/:id', buscarId);
router.get('/listar/cuenta/:id_cuenta', buscarCuenta);
router.post('/insertar', insertar);
router.put('/editar/:id', editar);
router.patch('/cobrar/:id', cobrar);
router.delete('/eliminar/:id', eliminar);

export default router;