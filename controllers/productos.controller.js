import { request, response } from "express"
import { Producto } from "../models/index.js"


export const crearProducto = async (req = request, res = response) => {
    const { estado, usuario, ...body } = req.body

    const nombre = body.nombre.toUpperCase()

    const productoBD = await Producto.findOne({ nombre })

    if (productoBD) {
        return res.status(400).json({
            msg: `El producto - ${productoBD.nombre} ya se encuentra registrado`
        })
    }

    const data = {
        ...body,
        nombre,
        usuario: req.usuario._id
    }


    const producto = new Producto(data)

    await producto.save()

    res.status(201).json({
        msg: `Producto creado - ${producto.nombre}`,
        producto
    })
}


export const obtenerProductos = async (req = request, res = response) => {

    const { limit = 5, skip = 0 } = req.query;
    const query = { estado: true };

    const [total, producto] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .skip(Number(skip))
            .limit(Number(limit))
            .populate('usuario')
            .populate('categoria')
    ]);

    if (total > 0) {
        return res.status(200).json({
            producto,
            total
        })
    } else {
        return res.status(204).json({
            msg: 'no hay productos en este momento',
            total
        })
    }
}

export const obtenerProductoById = async (req = request, res = response) => {
    const { id } = req.params

    const producto = await Producto.findById(id)
        .populate('usuario')
        .populate('categoria')

    if (!producto) {
        return res.status(404).json({
            msg: 'producto no encontrado'
        })
    }

    return res.status(200).json({ msg: 'Producto obtenido con exito ✅', producto }
    )
}

export const actualizarProductoByID = async (req = request, res = response) => {
    const { id } = req.params
    const { estado, usuario, ...data } = req.body

    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase()
    }

    data.usuario = req.usuario._id

    const producto = await Producto.findById(id)

    if (!producto) {
        return res.status(404).json({
            msg: 'producto no encontrada'
        })
    }

    const productoUpdate = await Producto.findByIdAndUpdate(id, data, { new: true })

    res.json({ msg: 'Producto Actualizado correctamente ✅', producto: productoUpdate })
}


export const eliminarProducto = async (req = request, res = response) => {

    const { id } = req.params

    const producto = await Producto.findById(id)

    if (!producto) {
        return res.status(404).json({
            msg: 'producto no encontrado'
        })
    }

    const productoDelete = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true })
    res.json({ msg: 'Producto Desactivado exitosamente ✅', producto: productoDelete })


} 