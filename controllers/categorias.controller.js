import { request, response } from "express"
import { Categoria } from "../models/index.js"

export const crearCategoria = async (req = request, res = response) => {

    const nombre = req.body.nombre.toUpperCase()

    const categoriaDB = await Categoria.findOne({ nombre })


    if (categoriaDB) {
        return res.status(400).json({
            msg: `la categoria - ${categoriaDB.nombre} ya se encuentra registrada`
        })
    }

    // Generar la data a guardar

    const data = {
        nombre,
        usuario: req.usuario._id
    }


    const categoria = new Categoria(data)


    await categoria.save()


    res.status(201).json({
        msg: `Categoria creada - ${nombre}`,
        categoria
    })
}


export const obtenerCategorias = async (req = request, res = response) => {

    const { limit = 5, skip = 0 } = req.query;
    const query = { estado: true };

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .skip(Number(skip))
            .limit(Number(limit))
            .populate('usuario')
    ]);

    if (total > 0) {
        return res.status(200).json({
            categorias,
            total
        })
    } else {
        return res.status(204).json({
            msg: 'no hay categorias',
            total
        })
    }

}

export const obtenerCategoria = async (req = request, res = response) => {
    const { id } = req.params

    const categoria = await Categoria.findById(id)
        .populate('usuario')

    if (!categoria) {
        return res.status(404).json({
            msg: 'categoria no encontrada'
        })
    }

    return res.status(200).json(
        categoria
    )
}

export const actualizarCategoria = async (req = request, res = response) => {
    const { id } = req.params
    const { nombre } = req.body
    const categoria = await Categoria.findById(id)

    if (!categoria) {
        return res.status(404).json({
            msg: 'categoria no encontrada'
        })
    }

    const categoriaUpdate = await Categoria.findByIdAndUpdate(id, { nombre }, { new: true })

    res.json({ msg: 'Actualizado', categoria: categoriaUpdate })
}


export const eliminarCategoria = async (req = request, res = response) => {

    const { id } = req.params

    const categoria = await Categoria.findById(id)

    if (!categoria) {
        return res.status(404).json({
            msg: 'categoria no encontrada'
        })
    }

    const categoriaDelete = await Categoria.findByIdAndUpdate(id, { estado: false }, { new: true })
    res.json({ msg: 'Desactivada', categoria: categoriaDelete })


}