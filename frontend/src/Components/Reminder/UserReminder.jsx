import React, { useEffect, useState } from 'react';
import './UserReminder.css';
import DateTimePicker from 'react-datetime-picker';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import TestNav from '../TestExample/TestNav';


function UserReminder() {
    const [reminderMsg, setReminderMsg] = useState("");
    const [remindAt, setRemindAt] = useState();
    const [reminderList, setReminderList] = useState([]);
    const [errorMessage, setErrorMessage] = useState(""); // State for error message
    const history = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:5000/UserReminders")
            .then(res => {
                setReminderList(res.data.Reminders);
            })
            .catch(error => {
                console.error('Error fetching reminders:', error);
            });
    }, []);

    const addReminder = () => {
        if (!reminderMsg || !remindAt ) {
            setErrorMessage("Please fill all fields");
            return;
        }

        axios.post("http://localhost:5000/UserReminders", { reminderMsg, remindAt})
            .then(res => {
                setReminderList(prevList => [...prevList, res.data.Reminders]);
                setErrorMessage(""); 
            })
            .catch(error => {
                console.error('Error adding reminder:', error);
            });
        setReminderMsg("");
        setRemindAt();
        
    }

    const deleteReminder = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/UserReminders/${id}`);
            if (Array.isArray(response.data.Reminders)) {
                setReminderList(response.data.Reminders);
            } else {
                console.error('Error deleting reminder: Reminders is not an array');
            }
            history("/");
            history("/useReminder"); // Navigate after successful deletion
        } catch (error) {
            console.error('Error deleting reminder:', error);
        }
    };
    return (
        <div>
            <TestNav/>        
            <div className='App'>
                <div className='homepage'>
                    <div className='homepage_header'>
                        <h1>Remind me</h1>
                        <input type='text' placeholder='Please enter reminder note here'
                            value={reminderMsg} onChange={e => setReminderMsg(e.target.value)} />
                        <DateTimePicker
                            value={remindAt}
                            onChange={setRemindAt}
                            minDate={new Date()}
                            minutePlaceholder='mm'
                            hourPlaceholder='hh'
                            dayPlaceholder='DD'
                            monthPlaceholder='MM'
                            yearPlaceholder='YYYY'
                        />
                       
                        <div className='button' onClick={addReminder}>Add Reminder</div>
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} 
                    </div>
                    <div className="homepage_body">
                        {reminderList.map(UserReminder => (
                            <div className="reminder_card" key={UserReminder._id}>
                                <h2>{UserReminder.reminderMsg}</h2>
                                <h3>Remind Me at:</h3>
                                {UserReminder.remindAt && (
                                    <p>{String(new Date(UserReminder.remindAt).toLocaleString(undefined, { timezone: "Asia/Kolkata" }))}</p>
                                )}
                               <div className="button" onClick={() => deleteReminder(UserReminder._id)}>Delete</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserReminder;
