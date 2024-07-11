import { check } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validacionesReceta = [
  check("nombreReceta")
    .notEmpty()
    .withMessage("El nombre del producto es un dato obligatorio")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre del producto debe tener entre 2 y 50 caracteres"),
  check("ingredientes")
    .notEmpty()
    .withMessage("Ingredientes es un dato obligatorio")
    .isLength({ min: 5, max: 500 })
    .withMessage("El nombre del producto debe tener entre 2 y 50 caracteres"),
    check("preparacion")
    .notEmpty()
    .withMessage("Preparacion es un dato obligatorio")
    .isLength({ min: 10, max: 2000})
    .withMessage("La preparacion debe tener entre 10 y 2000 caracteres"),
  check("imagen")
    .notEmpty()
    .withMessage("La imagen es un dato obligatorio")
    .matches(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/)
    .withMessage(
      "La imagen debe tener un formato de URL valida y terminar en jpg|jpeg|gif|png"
    ),
  check("categoria")
    .notEmpty()
    .withMessage("La categoria es un dato obligatorio")
    .isIn(['Entrada', 'Plato principal', 'Guarnicion', 'Postre', 'Sopas y cremas', 'Ensalada', 'Desayuno', 'Aperitivo'])
    .withMessage(
      "La categoria debe ser una de las siguientes opciones: 'Entrada', 'Plato principal', 'Guarnicion', 'Postre', 'Sopas y cremas', 'Ensalada', 'Desayuno', 'Aperitivo' "
    ),
    check("descripcion")
    .notEmpty()
    .withMessage("La descripcion breve es un dato obligatorio")
    .isLength({ min: 5, max: 300 })
    .withMessage(
      "La descripcion debe tener entre 5 y 300 caracteres"
    ),
  (req, res, next) => {
    resultadoValidacion(req, res, next);
  },
];

export default validacionesReceta;