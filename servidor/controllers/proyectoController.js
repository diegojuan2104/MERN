const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator");

const validarErrores = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
};

exports.crearProyecto = async (req, res) => {
  //Validar si hay erroresp
  validarErrores(req, res);

  try {
    //Crear un nuevo proyecto
    const proyecto = new Proyecto(req.body);

    // Guardar el creador del proyecto via JWT
    proyecto.creador = req.usuario.id;
    proyecto.save();
    res.json({ proyecto });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

//Obtiene los proyectos de una persona
exports.obtenerProyectos = async (req, res) => {
  try {
    const proyectos = await Proyecto.find({ creador: req.usuario.id }).sort({
      creado: -1,
    });
    res.json({ proyectos });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

//Actualiza un proyecto
exports.actualizarProyecto = async (req, res) => {
  //Validar Errores

  validarErrores(req, res);

  //Extraer la informacion del proyecto
  const { nombre } = req.body;
  const nuevoProyecto = {};

  if (nombre) {
    nuevoProyecto.nombre = nombre;
  }

  try {
    //Revisar el id
    let proyecto = await Proyecto.findById(req.params.id);

    //Validar la existencia del proyecto
    if (!proyecto) {
      res.status(404).json({ msg: "Proyecto no encontrado." });
    }

    //Verificar el creador del proyecto
    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    proyecto = await Proyecto.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: nuevoProyecto },
      { new: true }
    );

    res.json({ proyecto });
  } catch (error) {
    res.status(500).send("Hubo un error");
  }
};

//Eliminar un proyecto de
exports.eliminarProyecto = async (req, res) => {
  try {
    //Revisar el id
    let proyecto = await Proyecto.findById(req.params.id);

    //Validar la existencia del proyecto
    if (!proyecto) {
      res.status(404).json({ msg: "Proyecto no encontrado." });
    }

    //Verificar el creador del proyecto
    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    proyecto = await Proyecto.findByIdAndDelete({ _id: req.params.id });

    res.json({ msg: "Proyecto eliminado" });
  } catch (error) {
    res.status(500).send("Hubo un error");
  }
};
