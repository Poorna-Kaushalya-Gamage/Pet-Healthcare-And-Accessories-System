import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../Nav1/Nav';
import "./NoteApp.css";
import axios from 'axios';


function AddNote() {
    const history = useNavigate();
    const [inputs,setInputs] = useState({
        title:"",
        description:"",
    });

    const handleChange = (e)=>{
        setInputs((prevState) =>({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(inputs);
        sendRequest().then(()=>history("/noteApp"))
    }

    const sendRequest = async()=>{
        await axios.post("http://Localhost:5000/NoteBook",{
            title: String(inputs.title),
            description: String(inputs.description),
        }).then(res=>res.data);
    }


  return (
    <div>
      <Nav/>
      <div className="App">    
        <div className="homepage">
        <div className="center">
      <form onSubmit={handleSubmit}>
      
  <h1>Add Notes here</h1>
  <div>
    <div className="inputbox">
      <input type="text" name='title' onChange={handleChange} value={inputs.title} required />
      <span>Title</span>
    </div>
    <div className="inputbox">
      <textarea type="text" name='description' rows="4" cols="40" onChange={handleChange} value={inputs.description} required></textarea>
      <span>Note</span>
    </div>
    <div className="submit-container">
      <input type="submit" value="Submit" className="submit-button" />
    </div>
  </div>


      </form>
      </div>
      </div>
      </div>
      </div>
  )
}

export default AddNote
