import mongoose, {Schema} from "mongoose";

const recetaSchema = new Schema({
    nombreReceta:{
        type: String,
        required: true,
        unique: true,
        minLength:2,
        maxLength:50
    },
    imagen:{
        type: String,
        required: true
        // validar url de imagen
    },
    categoria:{
        type: String,
        required: true,
        enum:['Entrada', 'Plato principal', 'Guarnicion', 'Postre', 'Sopas y cremas', 'Ensalada', 'Desayuno', 'Aperitivo']
    },
    descripcion:{
        type: String,
        required: true,
        minLength:5,
        maxLength:300
    },
    ingredientes:{
        type: String,
        required: true,
        minLength:5,
        maxLength:500
    },
    preparacion:{
        type: String,
        required: true,
        minLength:30,
        maxLength:2000
    },
   
})

const Receta = mongoose.model('receta', recetaSchema);

export default Receta;