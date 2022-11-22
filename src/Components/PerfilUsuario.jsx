import React, { useState } from 'react'
import edit from '../images/edit.png'
import userAvatarn from '../images/user.png';
import { ModalUser } from './ModalUser';
import back from '../images/backt.png';

export const PerfilUsuario = ({ perfilUser,setChat,setUsers,setperfilUser,setcolor }) => {
  const sessionUser = JSON.parse(sessionStorage.getItem('USER'));

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function backChanel(){
    setUsers(false);
    setperfilUser(false);
    setChat(false);
    setcolor=(false);
 }
  return (
    <div className={perfilUser ? 'boxPerfilUser block' : 'boxPerfilUser non'}>
      <div className='back volver'>
        <img className="buhoLogo" alt='imágen de atra' src={back} onClick={backChanel} />
      </div>
      <h2 >Mi perfil</h2>
      <div className='backImg backImgAt'>
        <div className='boxWhite boxWhiteAt'>
          <img className='imgPerfilUser' src={sessionUser.imguser === null ? userAvatarn : sessionUser.imguser} alt='imagen del usuario' />
        </div>
      </div>
      <div className='boxNameEdith'>
        <label>{sessionUser.name}</label>
        <img className='iconEdith' onClick={handleShow} src={edit} alt='imagen de editar' />
      </div>
      <ModalUser show={show} handleClose={handleClose} />


    </div>
  )
}
