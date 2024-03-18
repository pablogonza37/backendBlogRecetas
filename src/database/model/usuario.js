import mongoose, {Schema} from "mongoose";

const usuarioSchema = new Schema({
    nombre:{
        type: String,
        required: true,
        unique: true,
        minLength:3,
        maxLength:50
    },
    email:{
        type: String,
        required: true
    },
    rol:{
        type: String,
        required: true,
        enum:['Usuario', 'Administrador']
    }
})

const Receta = mongoose.model('receta', recetaSchema);

export default Receta;