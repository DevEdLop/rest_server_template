import jwt from 'jsonwebtoken'
import { request, response } from 'express'
import { SECRET_KEY_JWT } from '../config/config.js'
import { Usuario } from '../models/index.js'




export const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token')

    if (!token) return res.status(401).json({
        msg: 'No hat token en la peticion'
    })

    try {

        const { uid } = jwt.verify(token, SECRET_KEY_JWT)

        // leer el usuario que corresponde al uid
        const usuario = await Usuario.findById(uid)

        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe DB'
            })
        }

        // verificar estado valido
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no valido - usuario (estado:false)'
            })
        }

        req.usuario = usuario

        next()
    } catch (error) {
        console.log("🚀 ~ validarJWT ~ error:", error)
        res.status(401).json({
            msg: 'Token no valido'
        })
    }




}