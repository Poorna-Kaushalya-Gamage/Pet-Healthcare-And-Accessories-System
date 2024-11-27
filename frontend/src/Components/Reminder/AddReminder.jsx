import React, { useEffect, useState } from 'react';
import Nav from '../Nav1/Nav';
import DateTimePicker from 'react-datetime-picker';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../TestExample/Sidebar';

function UserReminder() {
    const [reminderMsg, setReminderMsg] = useState("");
    const [remindAt, setRemindAt] = useState();
    const [reminderList, setReminderList] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
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
        if (!reminderMsg || !remindAt) {
            setErrorMessage("Please fill all fields");
            return;
        }

        axios.post("http://localhost:5000/UserReminders", { reminderMsg, remindAt })
            .then(res => {
                setReminderList(prevList => [...prevList, res.data.Reminders]);
                setErrorMessage("");
            })
            .catch(error => {
                console.error('Error adding reminder:', error);
            });
        setReminderMsg("");
        setRemindAt();
    };

    const deleteReminder = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/UserReminders/${id}`);
            if (Array.isArray(response.data.Reminders)) {
                setReminderList(response.data.Reminders);
            } else {
                console.error('Error deleting reminder: Reminders is not an array');
            }
            history("/");
            history("/addReminder"); 
        } catch (error) {
            console.error('Error deleting reminder:', error);
        }
    };
    

    return (
        <div>
            <Sidebar />
            <div className="bg-gradient-to-br from-white via-blue-500 to-white min-h-screen py-6 px-4">
                <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold mb-4 text-center">Remind me</h1>
                    <textarea
                        rows='2'
                        placeholder="Please enter reminder note here"
                        value={reminderMsg}
                        onChange={e => setReminderMsg(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 mb-3 w-full"
                    />
                    <DateTimePicker
                        value={remindAt}
                        onChange={setRemindAt}
                        minDate={new Date()}
                        minutePlaceholder='mm'
                        hourPlaceholder='hh'
                        dayPlaceholder='DD'
                        monthPlaceholder='MM'
                        yearPlaceholder='YYYY'
                        className="border border-gray-300 rounded-lg px-3 py-2 mb-3 w-full"
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
                        onClick={addReminder}
                    >
                        Add Reminder
                    </button>
                    {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
                </div>
                <div className="mt-8 grid grid-cols-3 gap-4">
                    {reminderList.map(userReminder => (
                        <div key={userReminder._id} className="bg-white p-4 rounded-lg shadow-md" style={{ minWidth: '250px' }}>
                            <h2 className="text-lg font-bold">{userReminder.reminderMsg}</h2>
                            <p className="text-gray-600 mt-1">Remind Me at: {String(new Date(userReminder.remindAt).toLocaleString(undefined, { timezone: "Asia/Kolkata" }))}</p>
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-2"
                                onClick={() => deleteReminder(userReminder._id)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default UserReminder;
