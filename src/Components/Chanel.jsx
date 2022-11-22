import React, { useState, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import chanelImg from '../images/chanel.png';
import imgPinguino from '../images/pinguino.gif';
import Dropdown from 'react-bootstrap/Dropdown';

import { socket } from './conection';
import { MenuMessage } from './MenuMessage';



export const Chanel = ({setChanelUnique,perfilUser,usersChat,setChat,chat,setUsers,setperfilUser,color,setcolor}) => {

   // const setChanelUnique = props.setChanelUnique

   // const { setChanelUnique } = props

   const sessionUser = JSON.parse(sessionStorage.getItem('USER'));


   const { register, handleSubmit, reset } = useForm();

   const [nameChanel, setNameChanels] = useState([]);

   const [errorChanel, errorChanels] = useState("");

   const [nameChanelBd, setNameChanelsBd] = useState([]);
   const [nameChanelGn, setNameChanelsGn] = useState([]);

   const axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
      }
    };

   // const [chanelUnique, setChanelUnique] = useState([]);
   const onSubmitChanel = async (objectChanel) => {

      const chanelUser = {
         namechanel: "#" + objectChanel.namechanel,
         idDueño: sessionUser.id
      }
      // axios.post('https://chatowl-service.onrender.com/chanel', chanelUser,axiosConfig)

      axios.post('https://chatowl-service.onrender.com/chanel', chanelUser,axiosConfig)
      .then((res) => {
         // console.log(res);
         socket.emit('nameChanel', res.data);
         setNameChanels([...nameChanel, res.data]);
         reset();
      }).catch((error) => {
         errorChanels(error.response.data.message);
         setTimeout(() => {
            errorChanels('');
         }, 2000)


      });
   }

   useEffect(() => {
      axios.get('https://chatowl-service.onrender.com/chanel',axiosConfig).then((response) => {

         setNameChanelsBd(response.data);
         // setChanelUnique(nameChanelBd.filter((e)=>e.namechanel==='#channelGeneral'))
    

      })
         .catch(error => {
            console.error(error.message);
         })

   }, []);

   const receiveChanel = useCallback((chanelSocket) => {
      setNameChanels((prevState) => [...prevState, chanelSocket]);
   }, [setNameChanels])


   useEffect(() => {

      socket.on('namesChanels', receiveChanel)
      return () => {
         socket.off('namesChanels', receiveChanel)
         // console.log('cerrando socket');
      }
   }, [receiveChanel]);

   useEffect(() => {
      setNameChanelsGn([...nameChanelBd, ...nameChanel])  
   }, [nameChanelBd, nameChanel])

// set de channel eliminado
   const removedChannel = useCallback((removedChannelSocket) => {
      console.log('removedChannelSocket', removedChannelSocket);
      setNameChanels(nameChanel.filter((e)=>e.id_channel!==removedChannelSocket))
      setNameChanelsBd(nameChanelBd.filter((e)=>e.id_channel!==removedChannelSocket))
      setNameChanelsGn(nameChanelGn.filter((e)=>e.id_channel!==removedChannelSocket))
   }, [nameChanelGn, setNameChanelsGn, setNameChanels, nameChanel, nameChanelBd, setNameChanelsBd])

   useEffect(()=>{
      socket.on('removedChannel', removedChannel)
      return () => {
         socket.off('removedChannel', removedChannel)
      }
   }, [removedChannel]);


// set de channel eliminado
const editChannel = useCallback((editChannelSocket) => {
   setNameChanelsGn(nameChanelGn.map((e)=>{
      if(e.id_channel===editChannelSocket.id_channel){
          e.namechanel = editChannelSocket.namechanel
      }
      return e;
   }))
}, [nameChanelGn, setNameChanelsGn])

useEffect(()=>{
   socket.on('editedChanel', editChannel)
   return () => {
      socket.off('editedChanel', editChannel)
   }
}, [editChannel]);


   const changeChanel = (name) => {
      setChanelUnique(nameChanelGn.filter((e)=>e.namechanel===name))
      setChat(true)
      // return () => {
      //    socket.off('chatmessage')
      //    console.log('cerrando socket');
      // }
   }
   function channel(){
      setUsers(false);
      setperfilUser(false);
      setChat(false)
      setcolor(true);
    }
   function users(){
      setUsers(true);
      setperfilUser(false);
      setChat(false);
      setcolor(false);
   
    }
 
   return (

      <div  className={perfilUser||usersChat||chat ?'boxBodyHome non':'boxBodyHome block'} >
         <div className='buttonChanelUser'>
            <div  className={color?'buttonChan blue':'buttonChan'} onClick={channel}>
               <h2 className={color?'blue':undefined}>Canales</h2>
            </div>
            <div className={color?'buttonUser':'buttonUser blue'}  onClick={users}>
               <h2 className={!color?'blue':undefined}>Usuarios</h2>
            </div>
         </div>
         <h2 className='titleNone'>Canales</h2>
         <div className='createChanel'>

            <form className='formChanel' onSubmit={handleSubmit(onSubmitChanel)}>
               <input className='inputChanel' type='text' {...register('namechanel', { required: true })} />

               {/* {errors.nameChanel?.type === 'required' && <label>'Este campo es requerido'</label>} */}
               <input className='buttonChanel' type='submit' value='Crear' />

            </form>

            <label className='errorChanel'>{errorChanel}</label>
         </div>
         <div className='boxChanel'>
            {nameChanelGn.map((chanel, index) => (
               <div key={index} className='nameChanel' >
                  <img className="avatar" alt='imagen de un avatar' src={chanelImg} onClick={(e) => changeChanel(chanel.namechanel)} />
                  <p onClick={(e) => changeChanel(chanel.namechanel)} className='nameChanelP'>{chanel.namechanel}</p>
                  {chanel.id_creator === sessionUser.id && 
                  <MenuMessage 
                     idChannel = {chanel.id_channel} 
                     nameChannel = {chanel.namechanel}
                 />
                  // <img className='menuMessage' alt='img de menú' src={menuMessage} />                               
                  }
                 
               </div>
            ))}

         </div>
         <div>
            <img className='imgPinguino' src={imgPinguino} alt='img de pinguino'/>
         </div>

      </div>

   )
}
