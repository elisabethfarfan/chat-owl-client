import React, { useState, useEffect, useCallback } from 'react';
import userAvatarn from '../images/user.png';
import messageImg from '../images/burbuja.png';
import { socket } from './conection';
import axios from 'axios';

export const Users = ({setChanelUnique,usersChat, setChat,setperfilUser,setUsers,setcolor,color}) => {

   const sessionUser = JSON.parse(sessionStorage.getItem('USER'));
   const [nameUser, setNameUsers] = useState([]);

   const [nameUserbd, setNameUsersbd] = useState([]);
   const [nameUserGn, setNameUsersGn] = useState([]);

   let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
      }
    };
   useEffect(() => {
      axios.get('https://chatowl-service.onrender.com/usersConnected',axiosConfig)
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
            setNameUsersbd(users);
            // setNameUsers(users);

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
      setChanelUnique(nameUserGn.filter((e)=>e.id===idUser));
      setChat(true);
      setUsers(false);

   }
   useEffect(() => {
      // const dataFilterUsers=nameUser.filter(e=>e.id!=);
      

   let users=[...nameUserbd, ...nameUser]
// const result = users.reduce((acc,item)=>{
            
//    if(!acc.includes(item)){

//       acc.push(item);
//    }
//    return acc;
//  },[])
let hash = {};
users = users.filter(o => hash[o.id] ? false : hash[o.id] = true);
// console.log(JSON.stringify(array));
      setNameUsersGn(users)

              
   }, [nameUserbd,nameUser,setNameUsers])
// console.log('socket',nameUser);
// console.log('bd',nameUser);
// console.log('Gn',nameUserGn);

const disconnected = useCallback((userDissconnected) => {
   const users=nameUserGn.filter(e=>e.id!==userDissconnected.id)
   setNameUsersGn(users);
}, [setNameUsersGn,nameUserGn])


useEffect(() => {

   socket.on('userLogout', disconnected)
   return () => {
      socket.off('userLogout', disconnected)
      // console.log('cerrando socket');
   }
}, [disconnected]);
function channel(){
   setUsers(false);
   setperfilUser(false);
   setChat(false);
   setcolor(true);
 
 }
function users(){
   setUsers(true);
   setperfilUser(false);
   setChat(false);
   setcolor(false);
  
 }
   return (
      <div  className={usersChat ?'boxBodyUsers block':'boxBodyUsers non'}>
        <div className='buttonChanelUser'>
            <div  className={color?'buttonChan blue':'buttonChan'} onClick={channel}>
               <h2 className={color?'blue':undefined}>Canales</h2>
            </div>
            <div className={color?'buttonUser':'buttonUser blue'}  onClick={users}>
               <h2 className={!color?'blue':undefined}>Usuarios</h2>
            </div>
         </div>
         <h2 className='titleNone '>Conectados</h2>

         <div className='userContent'>
            {nameUserGn.map((user, index) => (user.id !== sessionUser.id &&
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
