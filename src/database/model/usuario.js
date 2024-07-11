import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    nombreUsuario: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    rol: {
        type: String,
        required: true,
        enum: ['usuario', 'admin']
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;
