import express from 'express';
import cors from 'cors'
import 'colors';


import { PORT_RESTSERVER } from '../config/config.js';
import userRouter from '../routes/user.routes.js';

export class Server {
    constructor() {
        this.app = express()
        this.port = PORT_RESTSERVER
        this.port_console = `${this.port}`.blue

        this.usuariosPath = '/api/usuarios';

        // Middlewares
        this.middlewares()

        // Rutas de mi aplicacion
        this.routes()
    }

    middlewares() {
        // JSON body
        this.app.use(express.json())
        //  cors
        this.app.use(cors())
        //Directorio Publico
        this.app.use(express.static('public'))

    }
    routes() {
        this.app.use(this.usuariosPath, userRouter)
    }

    run() {
        this.app.listen(this.port, () => {
            console.log(`Escuchando en el puerto  (☞ﾟヮﾟ)☞ 🎉 '${this.port_console}' 🎉 ☜(ﾟヮﾟ☜)`)
        })
    }
}