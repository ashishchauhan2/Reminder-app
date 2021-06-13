import React, {useState} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Modal, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { useSelector, useDispatch } from 'react-redux';
import {createReminder, listReminders, updateReminder} from './redux/reminder/reminder.action';
import "react-datepicker/dist/react-datepicker.css";

import './App.css';

const AddReminderModal = (props)=> {
    const { modalState, onRequestClose } = props;
    const dispatch = useDispatch();
    const { reminderDetail } = useSelector(
        (state) => state.reminder
    );
    const [startDate, setStartDate] = useState(reminderDetail?.dateTime ? new Date(reminderDetail?.dateTime) : '');
    const { register, handleSubmit, control, setValue} = useForm({
        defaultValues: {
            dateTime: reminderDetail?.dateTime ? new Date(reminderDetail?.dateTime) : '',
            reminderText: reminderDetail?.reminderText ?? ''
        },
      });
    const onSubmit = async (data) => {
        await dispatch(reminderDetail?.id ? updateReminder(reminderDetail?.id, data): createReminder(data));
        await dispatch(listReminders());
        onRequestClose();
    };
    return (
        <Modal
            show={modalState}
            onHide={onRequestClose}
            >
            <form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Header closeButton style={{backgroundColor: "#CBC3E3", color: "#563d7c"}}>
                <Modal.Title>{reminderDetail.dateTime ? 'Update Reminder': 'Add Reminder'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="container">
                <section className='d-flex flex-column'>
                    <label >Reminder</label>
                    <textarea
                        placeholder='Type here '
                        {...register('reminderText', { required: true})}
                    />
                </section>
                <section className='d-flex flex-column mt-2'>
                    <label>Date</label>
                    <Controller name='dateTime' control={control}
                    render={
                        ()=> 
                        <DatePicker
                        minDate={new Date()}
                        selected={startDate}
                        value={startDate}
                        onChange={(date) => {
                            setValue('dateTime', date);
                            setStartDate(date);
                        }}
                        showTimeSelect={true}
                        timeFormat="h:mm aa"
                        timeIntervals={1}
                        timeCaption="time"
                        dateFormat="MMMM d, yyyy h:mm aa"
                        placeholderText="Select date"
                    />
                    }/>
                </section>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onRequestClose}>
            Close
          </Button>
          <Button type='submit' style={{ borderColor : '#CBC3E3', backgroundColor: "#CBC3E3", color: "#563d7c"}}>
            {reminderDetail?.dateTime ? 'Update' : 'Add'} 
          </Button>
        </Modal.Footer>
        </form>
        </Modal>
    );
  }
  
  export default AddReminderModal;