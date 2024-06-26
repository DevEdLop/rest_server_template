import { Schema, model } from 'mongoose';


const RoleSchema = Schema({
    rol: {
        type: String,
        required: [true, 'El rol es obligtorio']
    }
})

export const Role = model('Role', RoleSchema)