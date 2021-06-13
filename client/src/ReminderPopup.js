import React from 'react';
import moment from 'moment';
import { Modal, Button } from 'react-bootstrap';

import './App.css';

const ReminderPopup = (props)=> {
    const { modalState, onRequestClose, response} = props;
    return (
        <Modal
            show={modalState}
            onHide={onRequestClose}
            >
            <Modal.Header closeButton style={{backgroundColor: "#CBC3E3", color: "#563d7c"}}>
                <Modal.Title>Your reminder</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <section className='d-flex flex-column'>
                    <span><b>Reminder:</b></span>
                    <span> {response?.reminderText} </span>
                </section>
                <section className='d-flex flex-column mt-2'>
                    <span><b>Time:</b></span>
                    <span> {moment(response?.dateTime).format('MMMM DD yyyy, h:mm a')}</span>
                </section>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={onRequestClose}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
    );
  }
  
  export default ReminderPopup;