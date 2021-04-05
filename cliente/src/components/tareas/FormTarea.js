import React, { useContext, useState, useEffect } from "react";

import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const FormTarea = () => {
  //State del formulario
  const [tarea, guardarTarea] = useState({
    nombre: "",
  });

  //Extrae si un proyecto está activo
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  //Obtiene el state de las tareas
  const tareasContext = useContext(tareaContext);
  const {
    errortarea,
    tareaactual,
    agregarTarea,
    validarTarea,
    obtenerTareas,
    actualizarTarea,
    eliminarTareaSeleccionada
  } = tareasContext;

  //Effect que detecta si hay una tarea seleccionada
  useEffect(() => {
    if (tareaactual !== null) {
      guardarTarea(tareaactual);
    } else {
      guardarTarea({
        nombre: "",
      });
    }
  }, [tareaactual]);

  // Extraer los valores de la tarea
  const { nombre } = tarea;

  const handleChange = (e) => {
    guardarTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };

  if (!proyecto) return null;

  //Array destructuring
  const [proyectoActual] = proyecto;

  const onSubmit = (e) => {
    e.preventDefault();

    //Validar
    if (nombre.trim() === "") {
      validarTarea();
      return;
    }

    //Valida si edita o agrega
    if (tareaactual === null) {
      //Agregar la nueva tarea
      tarea.proyectoId = proyectoActual.id;
      tarea.estado = false;
      agregarTarea(tarea);
    }else{
      //Actualiza tarea
      actualizarTarea(tarea);

      //Elimina la tarea seleccionada 
      eliminarTareaSeleccionada();
    }

    //Obtener y filtrar las tareas del proyecto actual
    obtenerTareas(proyectoActual.id);

    //Reiniciar el form
    guardarTarea({
      nombre: "",
    });
  };
  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre tarea..."
            name="nombre"
            value={nombre}
            onChange={handleChange}
          />
        </div>

        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={tareaactual ? "Editar tarea" : "Agregar Tarea"}
          />
        </div>
      </form>

      {errortarea ? (
        <p className="mensaje error">El nombre de la tarea es obligatorio</p>
      ) : null}
    </div>
  );
};

export default FormTarea;
