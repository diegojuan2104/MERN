import React, { useContext } from "react";

import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const Tarea = ({ tarea }) => {
  //Proyecto state
  const proyectosContext = useContext(proyectoContext);
  const { proyecto,  } = proyectosContext;

  //Array destructuring
  const [proyectoActual] = proyecto;

  //Obtiene el state de las tareas
  const tareasContext = useContext(tareaContext);
  const { eliminarTarea, obtenerTareas, cambiarEstadoTarea, guardarTareaActual } = tareasContext;

  //Función que se ejecuta cuando el usuario desea eliminar una tarea
  const tareaEliminar = (id) => {
    eliminarTarea(id);
    obtenerTareas(proyectoActual.id);
  };

  //Funcion que modifica el estado de las tareas
  const cambiarEstado = tarea => {
    tarea.estado = !tarea.estado;
    cambiarEstadoTarea(Tarea);
  }

  //Agrega una tarea actual cuando el usuario desea editarla
  const seleccionarTareaActual = (tarea) =>{
    guardarTareaActual(tarea)
  }

  return (
    <li className="tarea sombra">
      <p>{tarea.nombre}</p>

      <div className="estado">
        {tarea.estado ? (
          <button type="button" className="completo" onClick={()=> cambiarEstado(tarea)}>
            Completo
          </button>
        ) : (
          <button type="button" className="incompleto" onClick={()=> cambiarEstado(tarea)} >
            Incompleto
          </button>
        )}
      </div>

      <div className="acciones">
        <button type="button" className="btn btn-primario" onClick={()=> seleccionarTareaActual(tarea)}>
          Editar
        </button>
        <button
          type="button"
          className="btn btn-secundario"
          onClick={() => tareaEliminar(tarea.id)}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default Tarea;
