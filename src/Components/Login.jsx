import React, { useState} from 'react';
import logo from '../images/logo.png'
import buhoAvion from '../images/buhoAvion.png';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { socket } from './conection';

export const Login = () => {

   const { register, handleSubmit, formState: { errors } } = useForm();
   const [errorLogin, setErrorLogin] = useState("");

   let navigate = useNavigate();
   let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
      }
    };
   const onSubmit = async (datUser) => {
      try {
         
      const res = await axios.post('http://localhost:4000/auth/logIn', datUser, axiosConfig )
      sessionStorage.setItem('token', JSON.stringify(res.data));
      const sessionToken = JSON.parse(sessionStorage.getItem('token'));
   
      // if (res) {
        
         console.log('hola1', res);
         const respuesta = await axios.get('http://localhost:4000/users', {
            headers: {
               // Authorization: document.cookie.substring(11),
               Authorization: sessionToken,
                           
            }
         })
         console.log(respuesta.status);
         if (respuesta.status === 200) {
            console.log('hola3');
            sessionStorage.setItem('USER', JSON.stringify(respuesta.data));

         console.log(respuesta)
            const res = await axios.put('http://localhost:4000/user/active', {statusUser:1, idUser:respuesta.data.id})
            socket.emit('userConected', respuesta.data);   
                 
            navigate('/home');
         }
      // }
      } catch (error) {
         setErrorLogin(error.response.data.message );
         setTimeout(() => {
            setErrorLogin('');
         }, 2000)
      }

        

   
   }

   return (
      <div className="generalContainer">

         <div className='leftContainer'>
            <img className="imgBuhoAvion" alt='imágen de un buho con un avión' src={buhoAvion} />
         </div>

         <div className="containerRegister">
            <img className="imgLogo" alt="imagen de un búho" src={logo} />
            <h1>ChatOwl</h1>
            <form className="boxForm" onSubmit={handleSubmit(onSubmit)}>
               <input className="input" type="email" placeholder="Correo" {...register('emailUser', { required: true })} />
               {errors.email?.type === 'required' && <label>'Este campo es requerido'</label>}
               <input className="input" type="password" placeholder="Contraseña" {...register('passwordUser', { required: true })} />
               {errors.password?.type === 'required' && <label>'Este campo es requerido'</label>}
               
               <label className='errorChanel'>{errorLogin}</label>

               <input className="button" type="submit" value="Inicia Sesión" />
            </form>
            <p>Si no tienes una cuenta, regístrate <Link to="/register">Aquí</Link></p>

         </div>

      </div>
   )
}
