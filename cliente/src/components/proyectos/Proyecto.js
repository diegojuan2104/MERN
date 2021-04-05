import React, { useContext } from "react";

import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const Proyecto = ({ proyecto }) => {
  //Obtiene el state de proyectos
  const proyectosContext = useContext(proyectoContext);
  const { proyectoActual} = proyectosContext;

  //Obtiene el state de las tareas 
  const tareasContext = useContext(tareaContext);
  const { obtenerTareas } = tareasContext;

  //Función para agregar el proyecto
  const seleccionarProyecto = id => {
    proyectoActual(id);
    obtenerTareas(id);
  }

  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => {
          seleccionarProyecto(proyecto.id);
        }}
      >
        {proyecto.nombre}
      </button>
    </li>
  );
};

export default Proyecto;
