import { Schema, model } from 'mongoose';



const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

})

CategoriaSchema.methods.toJSON = function () {
    const { __v, _id, ...categoria } = this.toObject();
    categoria.id = _id

    return categoria
}


export const Categoria = model('categoria', CategoriaSchema) 