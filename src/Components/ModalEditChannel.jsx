import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { socket } from './conection';

export const ModalEditChannel = ({ showEdit, handleCloseEdit, nameChannel, idChannel}) => {
    const [ nameInput, setInputName ] = useState('');

    function saveChanges(){
        const channelUpdate={
            nameChannel:'#'+ nameInput.target.value,
            idChannel: idChannel
           }
        
       axios.put('https://chatowl-service.onrender.com/channel/update',channelUpdate)
       .then((respuesta)=>{
            console.log('edit', respuesta); 
            handleCloseEdit(); 
            socket.emit('editChanel', respuesta.data);
        
        })
           .catch(error => {
              console.error(error.message);
           }) 

    }

  return (
    <div>
          
          <Modal show={showEdit} onHide={handleCloseEdit} >
                <Modal.Header closeButton >
                    <Modal.Title>Editar Perfil</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Nombre del Canal</Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue = {nameChannel.substring(1)}
                                autoFocus
                                // defaultValue={sessionUser.name}
                                onChange={setInputName}
                            />
                        </Form.Group>
                    </Form>                       
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEdit}>
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
