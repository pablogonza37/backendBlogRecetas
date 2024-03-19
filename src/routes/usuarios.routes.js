import { Router } from "express";
import { borrarUsuario, crearUsuario, listarUsuarios, obtenerUsuario } from "../controllers/usuarios.controllers.js";

const router = Router();

router.route("/usuarios").post(crearUsuario).get(listarUsuarios);
router.route("/usuarios/:id").get(obtenerUsuario).delete(borrarUsuario)

export default router;