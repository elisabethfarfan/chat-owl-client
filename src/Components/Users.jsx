import React, { useState, useEffect, useCallback } from 'react';
import userAvatarn from '../images/user.png';
import messageImg from '../images/burbuja.png';
import { socket } from './conection';
import axios from 'axios';

export const Users = ({setChanelUnique}) => {

   const sessionUser = JSON.parse(sessionStorage.getItem('USER'));
   const [nameUser, setNameUsers] = useState([]);

   useEffect(() => {
      axios.get('https://chatowl-service.onrender.com/usersConnected')
         .then((response) => {
      
            const users = [];
            response.data.forEach(e => {
               const datauser = {
                  id: e.id_user,
                  name: e.name_user,
                  status: e.status_user,
                  imguser: e.imguser,
               }
               users.push(datauser)
            })
            setNameUsers(users);

         })
         .catch(error => {
            console.error(error.message);
         })

   }, [])


   const receiveUser = useCallback((user) => {
      setNameUsers(user)
   }, [setNameUsers])


   useEffect(() => {

      socket.on('allUsers', receiveUser);

      return () => {
         socket.off('allUsers', receiveUser)
         // socket.emit('leave',receiveUser)

         console.log('cerrando socket');
      }
   }, [receiveUser]);

   function messageUser(idUser){
      setChanelUnique(nameUser.filter((e)=>e.id===idUser))

   }

   return (
      <div className='boxBodyUsers'>
         <h2>Conectados</h2>

         <div className='userContent'>
            {nameUser.map((user, index) => (user.id !== sessionUser.id &&
               <div key={index} className='userContainer'>
                  <div className='userboxContent'>
                     <div className='imgAvatar'>
                        <img className="avatarUser" alt='imágen de un avatar' src={user.imguser === null ? userAvatarn : user.imguser} />
                     </div>

                     <label className='nameuserconect'>{user.name}</label>
                     <div className='divstatus'>
                        <div className='status'></div>
                     </div>


                  </div>
                  <div onClick={(e)=>messageUser(user.id)} >
                     <img src={messageImg} className='messageDirect' alt='mensaje' />
                  </div>

               </div>
            ))}
         </div>

      </div>
   )
}
