import { Router } from 'express';
import { check } from 'express-validator';
import { googleSignIn, login } from '../controllers/auth.controller.js';
import { validarCampos } from '../middlewares/validar-campos.js';




const router = Router()

router.post('/login', [
    check('correo', 'el correo es obligatorio').isEmail(),
    check('password', 'la contraseña es obligatoria').not().isEmpty(),
    validarCampos
],
    login)

router.post('/google', [
    check('id_token', 'el id_token es necesario').not().isEmpty(),
    validarCampos
],
    googleSignIn)






export default router