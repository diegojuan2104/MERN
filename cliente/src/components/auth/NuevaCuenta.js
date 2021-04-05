import React, {useState}from "react";
import { Link } from "react-router-dom" 


const NuevaCuenta = () => {
  //State iniciar sesion
  const [usuario, guardarUsuario] = useState({
    nombre:"",
    email: "",
    password: "",
    confirmar:""
  });

  //Extraccion de datos
  const { nombre, email, password, confirmar } = usuario;

  const onChange = (e) => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  //Cuando el usuario inicie sesion

  const onSubmit = (e) => {
    e.preventDefault();

    //Validar que no hayan campos vacios



    //Validar password minimo de 6 caracteres


    //Validar 2 passwords iguales

    //Pasarlo al action
  };

  return (
    <div className="form-usuario" action={onSubmit}>
      <div className="contenedor-form sombra-dark">
        <h1>Crear una cuenta</h1>

        <form>

        <div className="campo-form">
            <label htmlFor="nombre">Email</label>
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
