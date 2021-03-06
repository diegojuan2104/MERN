import React, { useContext, useEffect } from "react";
import Proyecto from "./Proyecto";

import proyectoContext from "../../context/proyectos/proyectoContext";

import { CSSTransition, TransitionGroup } from "react-transition-group";

const ListadoProyectos = () => {
  const proyectosContext = useContext(proyectoContext);
  const { proyectos, obtenerProyectos } = proyectosContext;

  useEffect(() => {
    obtenerProyectos();
    //eslint-disable-next-line
  }, []);

  if (proyectos.length === 0)
    return <p>No hay proyectos comienza creando uno </p>;

  return (
    <ul className="listado-proyectos">
      {
        <TransitionGroup>
          {proyectos.map((proyecto) => (
            <CSSTransition  classNames="proyecto" timeout={500} key={proyecto.id}>
              <Proyecto proyecto={proyecto} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      }
    </ul>
  );
};

export default ListadoProyectos;
