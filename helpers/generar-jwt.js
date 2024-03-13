import jwt from 'jsonwebtoken'
import { SECRET_KEY_JWT } from '../config/config.js'

export const generarJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid }

        jwt.sign(payload, SECRET_KEY_JWT, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.log("🚀  ~ err:", err)
                reject(new Error('No se pudo generar el token'))
            } else {
                resolve(token)
            }
        }
        )



    })
}