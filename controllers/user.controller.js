
import { Usuario } from '../models/index.js'
import bcryptjs from 'bcryptjs'
export const usuariosGet = async (req, res) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });
}
export const usuariosPut = async (req, res) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...rest } = req.body;
    // Validar en base de datos

    if (password) {
        //
        const salt = bcryptjs.genSaltSync(12, password)
        rest.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, rest)

    res.json({
        msg: 'put cosas',
        usuario
    })
}
export const usuariosPost = async (req, res) => {


    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol })


    const salt = bcryptjs.genSaltSync(12, password)
    usuario.password = bcryptjs.hashSync(password, salt)


    await usuario.save()


    res.json({
        usuario
    })
}

export const usuariosGetById = async (req, res) => {
    const { id } = req.params;

    const usuario = await Usuario.findById(id)
    res.json({
        usuario
    })
}
export const usuariosDelete = async (req, res) => {

    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false })

    const usuarioAuth = req.usuario

    res.json({
        usuario,
        usuarioAuth
    })
}
export const usuariosPatch = (req, res) => {

    res.json({
        msg: "patch API - controlador"
    })
}