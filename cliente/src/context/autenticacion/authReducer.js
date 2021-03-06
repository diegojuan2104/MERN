import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
  OBTENER_PROYECTOS,
} from "../../types";

const proyectoReducer = (state, action) => {
  switch (action.type) {
    
    case LOGIN_EXITOSO:
    case REGISTRO_EXITOSO:
      localStorage.setItem("token", action.payload.token);

      return {
        ...state,
        autenticado: true,
        mensaje: null
      }

    case LOGIN_ERROR:
    case REGISTRO_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        mensaje: action.payload
      }
    
    case OBTENER_PROYECTOS: 
      return {
        ...state,
        usuario: action.payload
      }
    case OBTENER_USUARIO:
      return {
        ...state,
        usuario: action.payload
      }
    default:
      return state;
  }
};

export default proyectoReducer;
