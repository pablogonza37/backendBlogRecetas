import Receta from "../database/model/receta.js";

export const listarRecetas = async (req, res)=>{
    try {
        const recetas = await Receta.find();
        res.status(200).json(recetas);
      } catch (error) {
        console.log(error);
        res.status(404).json({
          mensaje: "No se pudo encontrar la lista de recetas",
        });
      }
}

export const obtenerReceta = async (req, res) => {
    try {
      const recetaBuscada = await Receta.findById(req.params.id);
      res.status(200).json(recetaBuscada);
    } catch (error) {
      console.log(error);
      res.status(404).json({
        mensaje: "No se pudo encontrar la receta",
      });
    }
  };

export const crearReceta = async (req, res) => {
    try {
      const recetaNueva = new Receta(req.body);
      await recetaNueva.save();
      res.status(201).json({
        mensaje: "La receta fue creada correctamente",
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        mensaje: "No se pudo procesar la solicitud de crear la receta",
      });
    }
  };