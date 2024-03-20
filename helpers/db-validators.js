import {
    Categoria,
    Producto,
    Usuario,
    Role
} from '../models/index.js'

export const validateRoleDB = async (rol = '') => {
    const existRol = await Role.findOne({ rol })
    if (!existRol) {
        throw new Error(` el rol ${rol} no se encuentra registrado en la DB`)
    }
}

export const validateEmailDB = async (correo = '') => {
    const isExistEmail = await Usuario.findOne({ correo })
    if (isExistEmail) {
        throw new Error(` el correo ${correo} ya se encuentra registrado en la DB`)
    }
}

export const validateUserByIdDB = async (id) => {
    const isExistUser = await Usuario.findById(id)
    if (!isExistUser) {
        throw new Error(`No existe un usuario con este Id: ${id}`)
    }
}
export const validateCategoryById = async (id) => {
    const isExistCategory = await Categoria.findById(id)
    if (!isExistCategory) {
        throw new Error(`No existe una categoria con este Id: ${id}`)
    }
}

export const validateProductoById = async (id) => {
    const isExistProducto = await Producto.findById(id)
    if (!isExistProducto) {
        throw new Error(`No existe un producto con este Id: ${id}`)
    }
}