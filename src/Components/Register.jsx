import React from 'react';
import logo from '../images/logo.png';
import buhoAvion from '../images/buhoAvion.png';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (datUser) => {

    const res = await fetch('https://chatowl-service.onrender.com/auth/signUp', {
      method: "POST",
      body: JSON.stringify(datUser),
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*", },
    });
    const data = await res.json();

    navigate('/login')
  }
  return (
    <div className="generalContainer">

      <div className='leftContainer'>
        <img className="imgBuhoAvion" alt='buho' src={buhoAvion} />
      </div>

      <div className="containerRegister">
        <img className="imgLogo" alt='buho' src={logo} />
        <h1>ChatOwl</h1>
        <form className="boxForm" onSubmit={handleSubmit(onSubmit)}>
          <input className="input" type="text" placeholder="Nombre" {...register('nameUser', { required: true })} />
          {errors.name?.type === 'required' && <label>'Este campo es requerido'</label>}
          <input className="input" type="email" placeholder="Correo" {...register('emailUser', { required: true })} />
          {errors.email?.type === 'required' && <label>'Este campo es requerido'</label>}
          <input className="input" type="password" placeholder="Contraseña"{...register('passwordUser', { required: true })} />
          {errors.password?.type === 'required' && <label>'Este campo es requerido'</label>}
          <input className="button" type="submit" value="Registrarse" />
        </form>
        <p>Si ya tienes una cuenta, inicia sesión <Link to="/login">Aquí</Link></p>

      </div>

    </div>
  )
}
