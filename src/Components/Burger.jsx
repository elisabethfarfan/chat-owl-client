import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import { socket } from './conection';
import { useNavigate } from "react-router-dom";

export const Burger = ({setperfilUser}) => {

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
    setperfilUser(true)
  }
  return (
    <div onClick={menuResponsive}>
      <Dropdown className='menuResponsive'>
        <Dropdown.Toggle  variant="success" id="dropdown-basic">
          <div className="hamburger" id="hamburger-3">
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </div>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1" onClick={perfil}>Perfil</Dropdown.Item>
          <Dropdown.Item href="#/action-2" >Usuarios</Dropdown.Item>
          <Dropdown.Item href="#/action-3" onClick={signOut} >Cerrar Sessión</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

    </div>
  )
}
