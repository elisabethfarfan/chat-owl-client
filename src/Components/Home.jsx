import React, { useState} from 'react';
import buhoLogo from '../images/buhoLogo.png';
import exit from '../images/exit.png';

import { Chanel } from './Chanel';
import { Chats } from './Chats';
import { PerfilUsuario } from './PerfilUsuario';
import { Users } from './Users';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { socket } from './conection';
import { Burger } from './Burger';
export const Home = () => {

  const navigate = useNavigate();
  const [perfilUser, setperfilUser] = useState(false);
  const [usersChat, setUsers] = useState(false);
  const [chat, setChat] = useState(false);
  const [color, setcolor] = useState(true);
  

  const [chanelUnique, setChanelUnique] = useState([{
    id_channel: 1,
    id_creator: 0,
    namechanel: "#channelGeneral"
  }]);
  const sessionUser = JSON.parse(sessionStorage.getItem('USER'));
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
    }
  };

  async function signOut() {
    const res = await axios.put('https://chatowl-service.onrender.com/user/active', { statusUser: 0, idUser: sessionUser.id }, axiosConfig);
    socket.emit('userDisconnected', sessionUser);
    navigate('/login')
  }

  return (
    <div>
      <div className='nav'>
        <div className='boxBuhoLogo'>
          <img className="buhoLogo" alt='imágen de un buho con un avión' src={buhoLogo} />
          <h2 className='titleChat'>ChatOwl</h2>
        </div>

        <div className='boxMenu'>


          <img className="cerrarSesion" onClick={signOut} alt='imágen de cerrarSesion' src={exit} />
        </div>
        <div className='menuHamburger'>
          <Burger setperfilUser={setperfilUser} setUsers={setUsers} setChat={setChat} setcolor={setcolor}></Burger>
        </div>
      </div>

      <div className='generalBoxBodyHome'>

       <Chanel setChanelUnique={setChanelUnique} perfilUser={perfilUser} usersChat={usersChat} setChat={setChat} chat={chat} setperfilUser={setperfilUser} setUsers={setUsers} color={color} setcolor={setcolor}></Chanel>
        <Chats chanelUnique={chanelUnique} setChanelUnique={setChanelUnique} chat={chat} setUsers={setUsers} setChat={setChat} setperfilUser={setperfilUser} setcolor={setcolor}></Chats>
       
          <div className={perfilUser||usersChat?'boxUsersConected block':'boxUsersConected non'}>
           
              <PerfilUsuario perfilUser={perfilUser} setperfilUser={setperfilUser} setUsers={setUsers} setChat={setChat} setcolor={setcolor}/>
            
         
            <Users setChanelUnique={setChanelUnique} usersChat={usersChat}  setChat={setChat} setUsers={setUsers} setperfilUser={setperfilUser} setcolor={setcolor} color={color}></Users>
            
           
          </div>
        

      </div>
      <div className='footer'>

      </div>
    </div>
  )
}
