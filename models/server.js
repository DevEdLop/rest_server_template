import express from 'express';
import cors from 'cors'
import 'colors';


import { PORT_RESTSERVER } from '../config/config.js';
import userRouter from '../routes/user.routes.js';
import categoriasRouter from '../routes/categorias.routes.js';
import authRouter from '../routes/auth.routes.js';
import { dbConection } from '../db/configdb.js';

export class Server {
    constructor() {
        this.app = express()
        this.port = PORT_RESTSERVER
        this.port_console = `${this.port}`.blue

        this.paths = {
            auth: '/api/auth',
            categorias: '/api/categorias',
            usuarios: '/api/usuarios',
        }

        /*   this.usuariosPath = '/api/usuarios';
          this.authPath = '/api/auth'; */

        // Conectar a la base de datos
        this.conectarDB()

        // Middlewares
        this.middlewares()

        // Rutas de mi aplicacion
        this.routes()
    }


    async conectarDB() {
        await dbConection();
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
        this.app.use(this.paths.auth, authRouter)
        this.app.use(this.paths.categorias, categoriasRouter)
        this.app.use(this.paths.usuarios, userRouter)
    }

    run() {
        this.app.listen(this.port, () => {
            console.log(`Escuchando en el puerto  (☞ﾟヮﾟ)☞ 🎉 '${this.port_console}' 🎉 ☜(ﾟヮﾟ☜)`)
        })
    }
}