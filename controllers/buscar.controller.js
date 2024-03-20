import { response } from "express";
import { isValidObjectId } from "mongoose";
import { Categoria, Producto, Usuario } from "../models/index.js";



const coleccionesValidas = [
    'categorias',
    'productos',
    'roles',
    'usuarios'
]



const buscarCategorias = async( termino = '', res = response) => {

    const isMongoId = isValidObjectId(termino)
    if( isMongoId ) {
        const categoria = await Categoria.findById(termino)
        return res.json({ 
            results: ( categoria ) ? [ categoria ] : []
        })
    }

    const regex = RegExp(termino, 'i')

    const categoria = await Categoria.find({nombre: regex, estado: true})
                            

    return res.json({ 
        results: categoria 
    })
}

const buscarProductos = async( termino = '', res = response) => {

    const isMongoId = isValidObjectId(termino)
    if( isMongoId ) {
        const producto = await Producto.findById(termino)
        return res.json({ 
            results: ( producto ) ? [ producto ] : []
        })
    }

    const regex = RegExp(termino, 'i')

    const producto = await Producto.find({nombre: regex, estado: true})
                                   .populate('categoria', 'nombre')
    return res.json({ 
        results: producto 
    })
}

const buscarUsuarios = async( termino = '', res = response) => {

    const isMongoId = isValidObjectId(termino)
    if( isMongoId ) {
        const usuario = await Usuario.findById(termino)
        return res.json({ 
            results: ( usuario ) ? [ usuario ] : []
        })
    }

    const regex = RegExp(termino, 'i')

    const usuario = await Usuario.find({
        $or: [{nombre: regex}, {correo: regex}],
        $and: [{estado: true}]
    })

    return res.json({ 
        results: usuario 
    })
}

export const busquedaPersonaliza = async (req, res = response) => {


    const { coleccion, termino } = req.params;

    if ( !coleccionesValidas.includes( coleccion ) ) {
        return res.status(400).json({
            msg: `las colecciones permitidas son: ${coleccionesValidas}`
        })
    }

    switch (coleccion) {
        case 'categorias':
            buscarCategorias(termino, res)
        break;
        case 'productos':
            buscarProductos(termino, res)
        break;
        case 'usuarios':
            buscarUsuarios(termino, res)
        break;

        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta busqueda'
            })
    }

}