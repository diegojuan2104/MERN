import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";


import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autenticacion/authContext";


const NuevaCuenta = (props) => {
  //Extraccion de valores del context
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, registrarUsuario } = authContext;

  //State iniciar sesion
  const [usuario, guardarUsuario] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmar: "",
  });

  //Extraccion de datos
  const { nombre, email, password, confirmar } = usuario;

  const onChange = (e) => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  //En caso de registro duplicado
  useEffect (() => {
    if(autenticado){
      props.history.push("/proyectos");
    }

    if(mensaje){
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
  }, [mensaje, autenticado, props.history])

  //Cuando el usuario inicie sesion
  const onSubmit = (e) => {
    e.preventDefault();

    //Validar que no hayan campos vacios
    if (
      nombre.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmar.trim() === ""
    ) {
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
      return;
    }
    //Validar password minimo de 6 caracteres
    if(password.length < 6){
      mostrarAlerta("Password debe ser de al menos 6 caracteres", "alerta-error");
      return;
    }

    //Validar 2 passwords iguales
    if(password !== confirmar){
      mostrarAlerta("Los password no son iguales", "alerta-error");
      return;
    }


    //Pasarlo al action
    registrarUsuario({
      nombre,
      email,
      password
    })
  };

  return (
    <div className="form-usuario" >
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Crear una cuenta</h1>

        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Tu nombre"
              onChange={onChange}
              value={nombre}
            ></input>
          </div>

          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu email"
              onChange={onChange}
              value={email}
            ></input>
          </div>

          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              value={password}
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={onChange}
            ></input>
          </div>

          <div className="campo-form">
            <label htmlFor="confirmar">Confirmar Password</label>
            <input
              value={confirmar}
              type="password"
              id="confirmar"
              name="confirmar"
              placeholder="Confirmación password"
              onChange={onChange}
            ></input>
          </div>

          <div className="campo-form">
            <input type="submit" className="btn btn-primario btn-block" />
          </div>
        </form>

        <Link to={"/Login"} className="enlace-cuenta">
          Volver a iniciar sesion
        </Link>
      </div>
    </div>
  );
};

export default NuevaCuenta;
