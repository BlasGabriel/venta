import {Router} from 'express';
import {
    listar,
    buscarId,
    buscarRuc, 
    insertar,
    editar,
    eliminar
} from '../controllers/ClientesController.js';

const router = Router();

router.get('/listar', listar);
router.get('/listar/id/:id', buscarId);
router.get('/listar/ruc/:ruc', buscarRuc);
router.post('/insertar', insertar);
router.put('/editar/:id', editar);
router.patch('/eliminar/:id', eliminar);

export default router;