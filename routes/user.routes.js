
import { Router } from 'express';
import {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch,
    usuariosGetById
} from '../controllers/user.controller.js';

const router = Router()

router.get('/', usuariosGet)

router.get('/:id', usuariosGetById)

router.put('/', usuariosPut)

router.post('/', usuariosPost)

router.delete('/', usuariosDelete)

router.patch('/', usuariosPatch)

export default router