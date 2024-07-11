import { check } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validacionesUsuario = [
  check("nombreUsuario")
    .notEmpty()
    .withMessage("El nombre del usuario es un dato obligatorio")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre del usuario debe tener entre 2 y 50 caracteres"),
  check("email")
    .notEmpty()
    .withMessage("El email es un dato obligatorio")
    .matches(/^\S+@\S+$/i)
    .withMessage("El email debe tener un formato valido"),
  check("password")
    .notEmpty()
    .withMessage("La contraseña es un dato obligatorio")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
    check("rol").notEmpty().withMessage("Es un dato obligatorio"),
  (req, res, next) => {
    resultadoValidacion(req, res, next);
  },
];

export default validacionesUsuario;