import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import { socket } from './conection';
import { useNavigate } from "react-router-dom";
import userAvatarn from '../images/user.png';
import down from '../images/down.png';

export const Burger = ({ setperfilUser, setUsers, setChat,setcolor }) => {

  const sessionUser = JSON.parse(sessionStorage.getItem('USER'));
  const navigate = useNavigate();
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
    }
  };
  function menuResponsive() {

  }
  async function signOut() {
    const res = await axios.put('https://chatowl-service.onrender.com/user/active', { statusUser: 0, idUser: sessionUser.id }, axiosConfig);
    socket.emit('userDisconnected', sessionUser);
    navigate('/login')
  }
  function perfil() {
    setperfilUser(true);
    setUsers(false);
    setChat(false);
    setcolor(true);
  }
  // function users() {
  //   setUsers(true);
  //   setperfilUser(false);
  //   setChat(false);
  //   setcolor(false);
  // }
  // function chanel() {
  //   setUsers(false);
  //   setperfilUser(false);
  //   setChat(false);
  //   setcolor(true);
  // }
  return (
    <div onClick={menuResponsive} className='menuBurger'>
      <Dropdown className='menuResponsive'>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          <div className='perfilResponsive'>
            <img className='avatarResponsive' src={sessionUser.imguser === null ? userAvatarn : sessionUser.imguser} alt='imagen del usuario' />
            <img className='downResponsive' src={down} alt='imagen del usuario' />

          </div>
        </Dropdown.Toggle>

        <Dropdown.Menu>
    
          <Dropdown.Item onClick={perfil}>Perfil</Dropdown.Item>
         
          <Dropdown.Item onClick={signOut} >Cerrar Sessión</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

    </div>
  )
}
