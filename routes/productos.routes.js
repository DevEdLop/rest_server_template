import { Router } from 'express'
import { check } from 'express-validator'


import { validarCampos, validarJWT } from '../middlewares/index.js'

import { actualizarProductoByID, crearProducto, eliminarProducto, obtenerProductoById, obtenerProductos } from '../controllers/productos.controller.js'
import { validateProductoById } from '../helpers/db-validators.js'


const router = Router()


/* Crear producto */
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre del producto es obligario').notEmpty(),
    validarCampos
],
    crearProducto)


/* Obtener productos */
router.get('/', [
    validarJWT,
],
    obtenerProductos)

/* Obtenerer producto */
router.get('/:id', [
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    validarCampos,
    check('id').custom(validateProductoById),
],
    obtenerProductoById)

/* Editar producto  */
router.put('/:id', [
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    validarCampos,
    check('id').custom(validateProductoById),
],
    actualizarProductoByID)

/* Eliminar o inactivar producto */
router.delete('/:id', [
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    validarCampos,
    check('id').custom(validateProductoById),
],
    eliminarProducto)

export default router