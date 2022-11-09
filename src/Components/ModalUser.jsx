import React, { useState } from 'react'

import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import userAvatarn from '../images/user.png';
import camera from '../images/camera.png';
import axios from 'axios';
import { socket } from './conection';


export const ModalUser = ({ show, handleClose }) => {
    const sessionUser = JSON.parse(sessionStorage.getItem('USER'));

    const [images, setImages ] = useState([]);    
    const [ imageToRemove, setImageToRemove ] = useState(null);

    const [ nameInput, setInputName ] = useState('');
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
      };

    function handleRemoveImg(imgObj){
        setImageToRemove(imgObj.public_id);
        axios.delete(`http://localhost:4000/${imgObj.public_id}`,axiosConfig)
        .then((response) => {  
              
            setImages([]);
        })
           .catch(error => {
              console.error(error.message);
           })  
    }

    function handleOpenWidget(){
        var myWidget = window.cloudinary.createUploadWidget({
            cloudName: 'dv95g7xon', 
            uploadPreset: 'chatOwl'}, (error, result) => { 
              if (!error && result && result.event === "success") { 
                setImages({
                    url: result.info.url,
                    public_id: result.info.public_id 
                });
                // console.log('Done! Here is the image info: ', result.info); 
              }
            }
          );
          myWidget.open();
    }
    async function saveChanges(){
        const userUpdate={
            imgUser:images.length===0?sessionUser.imguser:`${images.url}`,
            nameUser:nameInput.length===0?`${sessionUser.name}`: nameInput.target.value,
            idUser:sessionUser.id
        }
       axios.put('http://localhost:4000/profile',userUpdate,axiosConfig).then((respuesta)=>{
        const objectUser={
            id: respuesta.data.id_user,
            name: respuesta.data.name_user,
            status: respuesta.data.status_user,
            imguser: respuesta.data.imguser,
        }

      
        sessionStorage.setItem('USER', JSON.stringify(objectUser));
        socket.emit('userChanged', objectUser);  
        setImages([]);
        handleClose()
       })


    }

    return (
        <div >           
            
            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton >
                    <Modal.Title>Editar Perfil</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Tu nombre..."
                                autoFocus
                                defaultValue={sessionUser.name}
                                onChange={setInputName}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3 modalImage"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Agrega una imagen</Form.Label>
                            <div className='backImg'>
                                <div className='boxWhite'> 

                                    {images.url  &&
                                    <i  className='fa fa-times close-icon iconClose' 
                                        onClick={()=> handleRemoveImg(images)}>
                                    </i>
                                    }     

                                    <img className='imgPerfilUser' src={!images.url ? sessionUser.imguser : images.url } alt='imagen del usuario' />
                                </div>
                                <Button id="upload_widget" className="cloudinary-button camera" onClick={() =>handleOpenWidget()}>
                                   <img src={camera} alt='camera' className='cam' />
                                   
                                </Button>  
                            </div>
                          


                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button className='buttonModal' variant="primary" onClick={saveChanges}>
                        Guardar cambios
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
