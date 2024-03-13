import mongoose from 'mongoose';
import 'colors';

import { MONGODB_LOCAL } from '../config/config.js';

export const dbConection = async () => {

    try {
        //
        // console.log("🚀 ~ file: configdb.js:11 ~ dbConection ~ MONGODB_LOCAL:", MONGODB_LOCAL)
        await mongoose.connect(MONGODB_LOCAL)

        console.log(`
        (～￣▽￣)～ conectado a la db true papu [MONGO_DB]`.magenta)
    } catch (error) {
        console.log(error)
        throw new Error('Error al conectar con la base de datos')

    }

}