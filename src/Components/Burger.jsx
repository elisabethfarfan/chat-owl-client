import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import { socket } from './conection';
import { useNavigate } from "react-router-dom";

export const Burger = ({setperfilUser,setUsers,setChat}) => {

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
  async function signOut(){
    const res = await axios.put('https://chatowl-2l34.onrender.com/user/active', {statusUser:0, idUser:sessionUser.id},axiosConfig);
    socket.emit('userDisconnected', sessionUser);   
    navigate('/login')
  }
  function perfil(){
    setperfilUser(true);
    setUsers(false);
    setChat(false)
  }
  function users(){
    setUsers(true);
    setperfilUser(false);
    setChat(false)
  }
  function chanel(){
    setUsers(false);
    setperfilUser(false);
    setChat(false)
  }
  return (
    <div onClick={menuResponsive} className='menuBurger'>
      <Dropdown className='menuResponsive'>
        <Dropdown.Toggle  variant="success" id="dropdown-basic">
          <div className="hamburger" id="hamburger-3">
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </div>
        </Dropdown.Toggle>

        <Dropdown.Menu>
        <Dropdown.Item  onClick={chanel}>Canales</Dropdown.Item>
          <Dropdown.Item  onClick={perfil}>Perfil</Dropdown.Item>
          <Dropdown.Item  onClick={users}>Usuarios</Dropdown.Item>
          <Dropdown.Item  onClick={signOut} >Cerrar Sessión</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

    </div>
  )
}
