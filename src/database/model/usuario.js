import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    nombreUsuario: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        minLength: [2, "Debe ingresar como mínimo 2 caracteres para el nombre de usuario."],
        maxLength: [50, "Debe ingresar como máximo 50 caracteres para el nombre de usuario."]
      },
      email: {
        type: String,
        required: [true, "El email es obligatorio"],
        match: [/^\S+@\S+$/i, "El email ingresado no es válido"]
      },
      password: {
        type: String,
        required: true,
        enum: ['usuario', 'admin']
    },
    password: {
        type: String,
        validate: {
          validator: function(value) {
            return value === this.password;
          },
          message: "Las contraseñas no coinciden"
        }
      },
      rol: {
        type: String 
      }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;
