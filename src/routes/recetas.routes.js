import { Router } from "express";
import {
  borrarReceta,
  crearReceta,
  editarReceta,
  listarRecetas,
  obtenerReceta,
} from "../controllers/recetas.controllers.js";
import validacionesReceta from "../helpers/validacionReceta.js";

const router = Router();

router.route("/recetas").get(listarRecetas).post([validacionesReceta], crearReceta);
router
  .route("/recetas/:id")
  .get(obtenerReceta)
  .delete(borrarReceta)
  .put([validacionesReceta], editarReceta);

export default router;
