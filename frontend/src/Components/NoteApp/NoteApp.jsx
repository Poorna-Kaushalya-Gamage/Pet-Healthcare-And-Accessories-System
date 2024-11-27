import React, { useEffect, useState } from "react";
import Nav from "../Nav1/Nav";
import axios from "axios";
import "./NoteApp.css";
import DisplayNote from "./DisplayNote";


const URL = "http://Localhost:5000/NoteBook";

const fetchHandler = async () =>{
  return await axios.get(URL).then((res)=>res.data);
}

function NoteApp() {

  const [NoteRecords,setNotes] = useState([]);
  const [searchQuery,setSearchQuery] = useState("");
  const [noResult,setNoResults] = useState(false);

  useEffect(()=>{
    fetchHandler().then((data)=>setNotes(data.NoteRecords));
  },[])

  const handleSearch = () => {
    fetchHandler().then((data)=>{
      const filteredNotes = data.NoteRecords.filter((note)=>
      note.title.toLowerCase().includes(searchQuery.toLowerCase())||
      note.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setNotes(filteredNotes);
    setNoResults(filteredNotes.length === 0);
    })
  }

  return (
    <div>
      <Nav /> 
      <h1>Notes</h1>  
      <input onChange={(e)=> setSearchQuery(e.target.value)}
      type="text"
      name="search"
      placeholder="Search notes in here"
      ></input> 
      <button onClick={handleSearch}>Search</button> 

      {noResult ? (
        <div>
          <p>No Pet Records Found</p>
        </div>
      ):(
        <div>
        {NoteRecords && NoteRecords.map((NoteRecord,i)=>(  
          <div key={i}>
             <DisplayNote NoteRecord={NoteRecord}/>
          </div>
        ))}
       </div>
      )}

    </div>  
  )
}

export default NoteApp;
