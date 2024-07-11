import Usuario from "../database/model/usuario.js";
import bcrypt from "bcrypt";
import generarJWT from "../helpers/generarJWT.js";

export const crearUsuario = async (req, res) => {
  try {
    const { email, password, nombreUsuario } = req.body;
   
    const nombreValidacion = await Usuario.findOne({ nombreUsuario });
    if (nombreValidacion) {
      return res.status(400).json({
        mensaje: "Nombre de usuario ya en uso",
      });
    }
    const emailValidacion = await Usuario.findOne({ email });
    if (emailValidacion) {
      return res.status(400).json({
        mensaje: "Este correo ya se encuentra registrado",
      });
      
    } // encriptar password
    const saltos = bcrypt.genSaltSync(10);
    const passEncriptada = bcrypt.hashSync(password, saltos);
    const usuarioNuevo = new Usuario(req.body);
    usuarioNuevo.password = passEncriptada;
    await usuarioNuevo.save();
    // agregar un token
    const token = await generarJWT(usuarioNuevo._id, usuarioNuevo.email);

    res.status(201).json({
      mensaje: "El usuario fue creado correctamente",
      email: usuarioNuevo.email,
      nombreUsuario: usuarioNuevo.nombreUsuario,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      mensaje: "No se pudo procesar la solicitud de crear el usuario.",
    });
  }
};

export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "No se pudo encontrar la lista de usuarios",
    });
  }
};

export const obtenerUsuario = async (req, res) => {
  try {
    const usuarioBuscado = await Usuario.findById(req.params.id);
    res.status(200).json(usuarioBuscado);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "No se pudo encontrar el usuario",
    });
  }
};

export const borrarUsuario = async (req, res) => {
  try {
    const usuarioBuscado = await Usuario.findById(req.params.id);
    if (!usuarioBuscado) {
      return res.status(404).json({
        mensaje: "No se pudo eliminar el usuario, el id es incorrecto",
      });
    }
    await Usuario.findByIdAndDelete(req.params.id);
    res.status(200).json({ mensaje: "El usuario fue eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "ocurrio un error al intentar eliminar el usuario",
    });
  }
};

export const editarUsuario = async (req, res) => {
  try {
    const usuarioBuscado = await Usuario.findById(req.params.id);
    if (!usuarioBuscado) {
      return res.status(404).json({
        mensaje: "No se pudo editar el usuario, el id es incorrecto",
      });
    }
    await Usuario.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ mensaje: "El usuario fue modificado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "ocurrio un error al intentar editar el usuario",
    });
  }
};


export const login = async (req, res) => {
  try {
    let usuarioBuscado;
    const { email, password, nombreUsuario } = req.body;

    // Buscar por email
    if (email) {
      usuarioBuscado = await Usuario.findOne({ email });
    }
    
    // Si no se encontró por email, buscar por nombreUsuario
    if (!usuarioBuscado && nombreUsuario) {
      usuarioBuscado = await Usuario.findOne({ nombreUsuario });
    }

    // Si no se encontró el usuario
    if (!usuarioBuscado) {
      return res.status(400).json({
        mensaje: "Correo, nombre de usuario o contraseña incorrectos",
      });
    }

    // Validar contraseña
    const passwordValido = bcrypt.compareSync(password, usuarioBuscado.password);

    if (!passwordValido) {
      return res.status(400).json({
        mensaje: "Correo, nombre de usuario o contraseña incorrectos",
      });
    }

    // Generar token JWT
    const token = await generarJWT(usuarioBuscado._id, usuarioBuscado.email);

    // Respuesta exitosa
    res.status(200).json({
      mensaje: "Inicio de sesión exitoso",
      nombreUsuario: usuarioBuscado.nombreUsuario,
      email: usuarioBuscado.email,
      token: token,
      rol: usuarioBuscado.rol,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error al intentar loguear un usuario.",
    });
  }
};
