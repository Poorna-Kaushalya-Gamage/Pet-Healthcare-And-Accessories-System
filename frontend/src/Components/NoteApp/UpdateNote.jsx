import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import "./NoteApp.css";

function UpdateNote() {
    const [inputs,setInputs] = useState({
        title: "",
        description: ""
    });
 
    const id = useParams().id;
    const history = useNavigate();

    useEffect(()=>{
        const fetchHandler = async () => {
            try{
                const response = await axios.get(`http://localhost:5000/NoteBook/${id}`);
                setInputs(response.data.noteRecord);
            }catch(error){
                console.error('Error fetching note record:', error);
            }
        };
        fetchHandler();
    },[id]);

    const handleChange = (e) => {
        setInputs(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/NoteBook/${id}`, inputs);
            alert("Details Updated Successfully");
            history("/noteApp");
        } catch (error) {
            console.error('Error updating note record:', error);
        }
    };

    return (
        <div className="App">
            <div className="homepage">
                <div className="center">
                    <h1>Update Notes</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="inputbox">
                            <input
                                type="text"
                                name='title'
                                id='title'
                                value={inputs.title}
                                onChange={handleChange}
                                required
                            />
                            <span>Title</span>
                        </div>
                        <div className="inputbox">
                            <textarea
                                type="text"
                                name='description'
                                id='description'
                                rows="4"
                                cols="40"
                                value={inputs.description}
                                onChange={handleChange}
                                required
                            ></textarea>
                            <span>Note</span>
                        </div>
                        <div className="submit-container">
                            <input type="submit" value="Update" className="submit-button" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateNote;
