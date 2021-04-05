import React, { useReducer } from "react";
import TareaContext from "./tareaContext";
import TareaReducer from "./tareaReducer";

import { v4 as uuidv4 } from "uuid";

import {
  AGREGAR_TAREA,
  TAREAS_PROYECTO,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  ESTADO_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREAe
} from "../../types/index";
const TareaState = (props) => {
  const initialState = {
    tareas: [
      { id: 1, nombre: "Elegir Plataforma", estado: true, proyectoId: 1 },
      { id: 2, nombre: "Comparar hosting", estado: true, proyectoId: 2 },
      { id: 3, nombre: "Hacer balances", estado: true, proyectoId: 3 },
      { id: 4, nombre: "Programar entregas", estado: true, proyectoId: 4 },
      { id: 44, nombre: "Elegir Plataforma", estado: true, proyectoId: 4 },
      { id: 366, nombre: "Comparar hosting", estado: true, proyectoId: 3 },
      { id: 433, nombre: "Hacer balances", estado: true, proyectoId: 2 },
      { id: 23234, nombre: "Programar entregas", estado: true, proyectoId: 1 },
      { id: 111, nombre: "Elegir Plataforma", estado: true, proyectoId: 1 },
      { id: 11111, nombre: "Comparar hosting", estado: true, proyectoId: 3 },
      { id: 1123123, nombre: "Hacer balances", estado: true, proyectoId: 1 },
      {id: 898989899,nombre: "Programar entregas",estado: true,proyectoId: 2,},
    ],

    errortarea: false,
    tareasproyecto: null,
    tareaactual: null,
  };

  //Dispatch y state
  const [state, dispatch] = useReducer(TareaReducer, initialState);

  /* -------------------------------------------------------------------------- */
  /*                               FUNCIONES CRUD                               */
  /* -------------------------------------------------------------------------- */

  //Obtener las funciones de un proyecto
  const obtenerTareas = (proyectoId) => {
    dispatch({
      type: TAREAS_PROYECTO,
      payload: proyectoId,
    });
  };

  // Agregar tarea al proyecto del
  const agregarTarea = (tarea) => {
    tarea.id = uuidv4();
    dispatch({
      type: AGREGAR_TAREA,
      payload: tarea,
    });
  };

  //Muestraa un error si el campo de tarea está vacio
  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA,
    });
  };

  //Elimina una tarea por id
  const eliminarTarea = (id) => {
    dispatch({
      type: ELIMINAR_TAREA,
      payload: id,
    });
  };

  //Cambia el estado de una tarea
  const cambiarEstadoTarea = (tarea) => {
    dispatch({
      type: ESTADO_TAREA,
      payload: tarea,
    });
  };

  //Extrae una tarea para edición 
  const guardarTareaActual = (tareaActual) => { 
    dispatch({
      type: TAREA_ACTUAL,
      payload: tareaActual,
    })
  }

  //Actualiza la tarea seleccionada 
  const actualizarTarea = (tarea) => {
    dispatch({
      type: ACTUALIZAR_TAREA,
      payload: tarea,
    })
  }

  //Elimina la tarea seleccionada
  const eliminarTareaSeleccionada = (tareaSeleccionada) => {
    dispatch({
      type: LIMPIAR_TAREA
    })
  }

  return (
    <TareaContext.Provider
      value={{
        tareas: state.tareas,
        tareasproyecto: state.tareasproyecto,
        errortarea: state.errortarea,
        tareaactual: state.tareaactual,

        validarTarea,
        obtenerTareas,
        agregarTarea,
        eliminarTarea,
        cambiarEstadoTarea,
        guardarTareaActual,
        actualizarTarea,
        eliminarTareaSeleccionada
      }}
    >
      {props.children}
    </TareaContext.Provider>
  );
};

export default TareaState;
