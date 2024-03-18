import { Router } from "express";
import { listarRecetas } from "../controllers/recetas.controllers.js";

const router = Router();

router.route('/recetas').get(listarRecetas);

export default router;