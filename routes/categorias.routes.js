import { Router } from 'express';
import { check } from 'express-validator';


import { validarCampos, validarJWT } from '../middlewares/index.js';
import { actualizarCategoria, crearCategoria, eliminarCategoria, obtenerCategoria, obtenerCategorias } from '../controllers/categorias.controller.js';
import { validateCategoryById } from '../helpers/db-validators.js';



const router = Router()


// Obtener las categorias - publico 
router.get('/', [
    validarJWT,
],
    obtenerCategorias)

// Obtener categoria por id - publico
router.get('/:id', [
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    validarCampos,
    check('id').custom(validateCategoryById),
],
    obtenerCategoria)


// Crear categoria - privado - cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'el nombre es obligatorio').notEmpty(),
    validarCampos
],
    crearCategoria)

// Actualizar - privado - cualquiera con un token valido
router.put('/:id', [
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    validarCampos,
    check('id').custom(validateCategoryById),
],
    actualizarCategoria)


// Borrar una categoria si es admin
router.delete('/:id', [
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    validarCampos,
    check('id').custom(validateCategoryById),
],
    eliminarCategoria)



export default router