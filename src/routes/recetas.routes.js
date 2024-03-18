import { Router } from "express";
import {
  borrarReceta,
  crearReceta,
  editarReceta,
  listarRecetas,
  obtenerReceta,
} from "../controllers/recetas.controllers.js";

const router = Router();

router.route("/recetas").get(listarRecetas).post(crearReceta);
router
  .route("/recetas/:id")
  .get(obtenerReceta)
  .delete(borrarReceta)
  .put(editarReceta);

export default router;
