import { response } from "express"
import { generarJWT } from "../helpers/generar-jwt.js"
import { Usuario } from "../models/index.js"
import bcryptjs from 'bcryptjs'
import { googleVerify } from "../helpers/google-verify.js"

export const login = async (req, res = response) => {

    const { correo, password } = req.body

    try {

        // Verificar si el email existe
        const usuario = await Usuario.findOne({ correo })
        if (!usuario) {
            return res.json({
                msg: 'Usuario / password invalido (correo)'
            })
        }
        // si el usuario esta activo
        if (!usuario.estado) {
            return res.json({
                msg: 'Usuario invalido (estado: false)'
            })
        }

        // verificar contraseña
        const contraseñaValida = bcryptjs.compareSync(password, usuario.password)
        if (!contraseñaValida) {
            return res.json({
                msg: 'Usuario / password invalido (password)'
            })
        }

        // Generar el JWT
        const token = await generarJWT(usuario.id)

        res.json({
            msg: 'LOGIN OK!',
            usuario,
            token
        })
    } catch (error) {
        return res.json({
            msg: 'comuniquese con el administrador'
        })
    }


}


export const googleSignIn = async (req, res = response) => {

    const { id_token } = req.body

    try {
        const { nombre, correo, img } = await googleVerify(id_token);

        let usuario = await Usuario.findOne({ correo })

        if (!usuario) {
            // crear usuario si no existe
            const data = {
                nombre,
                correo,
                password: '*',
                img,
                google: true
            }
            usuario = new Usuario(data)

            await usuario.save()
        }

        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Comuniquese con el administrador'
            })
        }

        const token = await generarJWT(usuario.id)


        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log("🚀 ~ googleSignIn ~ error:", error)
        res.status(400).json({
            msg: 'Error interno'
        })
    }





}