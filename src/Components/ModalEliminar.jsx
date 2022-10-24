import axios from 'axios';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const ModalEliminar = ({ show, handleClose, nameChannel, idChannel}) => {
    function deleteChannel(){
        axios.delete(`http://localhost:4000/channel/${idChannel}`)
        .then((response) => {     
            handleClose();
        
        })
           .catch(error => {
              console.error(error.message);
           })  
    }
  return (
    <div>
          <>
           
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>¿Estás seguro que quieres eliminar el canal {nameChannel} ? </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={deleteChannel}>
                    Eliminar
                </Button>
                </Modal.Footer>
            </Modal>
    </>         
    </div>
  )
}
