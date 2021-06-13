import React, {useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
import moment from 'moment';
import ReactTooltip from 'react-tooltip';
import { useSelector, useDispatch } from 'react-redux';
import AddReminderModal from './AddReminderModal';
import ReminderPopup from './ReminderPopup';
import { deleteSingleReminder, getReminderDetail, listReminders, clearReminderData } from './redux/reminder/reminder.action';
import './App.css';

const ENDPOINT = "https://reminderdemoapp.herokuapp.com";

export const App = ()=> {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [id, setId] = useState(null);
  const [response, setResponse] = useState({});
  const [reminderPopup, openReminderPopup] = useState(false);
  const { remindersList } = useSelector(
    (state) => state.reminder
  );
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT, {'transports': ['websocket', 'polling']});
    socket.on("FromAPI", data => {
      setResponse(data);
      openReminderPopup(!reminderPopup);
      dispatch(listReminders());
    });

    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const fetchReminderList = async() =>{
      await dispatch(listReminders());
    }
    fetchReminderList();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    ReactTooltip.rebuild();
  }); 
  const deleteReminder = async (id)=> {
    await dispatch(deleteSingleReminder(id));
    await dispatch(listReminders());
  }
  const reminderDetail = async (id)=> {
    await dispatch(getReminderDetail(id));
    setToggle(true);
  }
console.log("reminderPopup",reminderPopup)
  return (
    <div className="App">
      <nav className="navbar navbar-light" style={{backgroundColor: "#CBC3E3", color: "#563d7c"}}>
        <header>
          <h1>Reminder App <span className="badge bg-secondary">Demo</span> </h1>
        </header>
      </nav>
      <div >
        <button type="button" className="btn btn-outline-info mt-4 ml-4" onClick={()=> setToggle(!toggle)}>
          Add reminder
        </button>
        <div className='d-grid gap-3 p-4'>
          {remindersList?.length > 0 ? remindersList.slice(0).reverse().map((field, index) => {
              return (
                <div onMouseEnter ={()=> setId(index)} onMouseLeave ={()=> setId(null)}
                  className={`p-4 mt-2 bg-light border rounded ${id === index && 'shadow'} d-flex flex-row justify-content-between`} key={index}> 
                  <section onClick={()=>!field?.check &&  reminderDetail(field?.id)}>
                    <span className={`dot mb-1 ${ field?.check ? 'redSignal': 'greenSignal'}`}></span>
                    <span className='reminderDate cursor'><b>{moment(field?.dateTime).format('MMMM DD yyyy, h:mm a')}</b></span>
                    <span data-tip={field?.reminderText?.length > 92 ? field?.reminderText :'' } className='reminderText cursor'><b>{field?.reminderText}</b></span>
                  </section>
                  <div className='float-right' data-tip='delete'>
                    <span onClick={()=> deleteReminder(field?.id)}><i className="bi bi-trash iconColor cursor"></i></span>
                  </div>
              </div>
              )
          }) :'No Reminder added'}
        </div>
      </div>
    <ReactTooltip />
    {toggle && (
      <AddReminderModal
        modalState={toggle}
        onRequestClose={()=> {
          dispatch(clearReminderData());
          setToggle(!toggle)
        }}
      />
    )}
    {reminderPopup && (
      <ReminderPopup
        modalState={reminderPopup}
        response = {response}
        onRequestClose={()=> {
          openReminderPopup(!reminderPopup);
        }}
      />
    )}
    </div>
  );
}

export default App;
