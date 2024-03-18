export const listarRecetas = (req, res)=>{
    console.log('desde listar recetas');
    res.send('enviar lista de recetass...')
}

export const crearTarea = async (req, res) => {
    try {
      const tareaNueva = new Tarea(req.body);
      await tareaNueva.save();
      res.status(201).json({
        mensaje: "La tarea fue creada correctamente",
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        mensaje: "No se pudo procesar la solicitud de crear la tarea",
      });
    }
  };