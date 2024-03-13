
import { Router } from 'express';
import { check } from 'express-validator';
import {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch,
    usuariosGetById
} from '../controllers/user.controller.js';
import {
    validateEmailDB,
    validateRoleDB,
    validateUserByIdDB
} from '../helpers/db-validators.js';

import {
    isAdminRole,
    validarJWT,
    validarCampos,
    tieneRole
} from '../middlewares/index.js'



const router = Router()

router.get('/', usuariosGet)

router.get('/:id', usuariosGetById)

router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(validateUserByIdDB),
    check('rol').custom(validateRoleDB),
    validarCampos
], usuariosPut)

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseñá debe ser minimo de 6 caracteres').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(validateEmailDB),
    check('rol').custom(validateRoleDB),
    // check('rol', 'El rol no es valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validarCampos
], usuariosPost)

router.delete('/:id', [
    validarJWT,
    // isAdminRole,
    tieneRole('ADMIN_ROLE', 'LO_QUE_SEA_ROLE'),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(validateUserByIdDB),
    validarCampos
], usuariosDelete)

router.patch('/', usuariosPatch)

export default router