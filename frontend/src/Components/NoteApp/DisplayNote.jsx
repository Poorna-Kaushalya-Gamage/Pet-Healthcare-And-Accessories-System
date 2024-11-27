import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function DisplayNote(props) {
    const {_id,title,description} = props.NoteRecord

    const history = useNavigate();

    const deleteHandler = async()=>{
        await axios.delete(`http://Localhost:5000/NoteBook/${_id}`)
        .then(res=>res.data)
        .then(()=>history("/"))
        .then(()=>history("/noteApp"))
    }
  return (
    <div>

    <div className="card">    
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary">Description</h6>
              <p className="card-text">{description}</p>
              <div className="button-container">
                <div className="card-link delete-button"><Link to={`/noteApp/${_id}`}>Update</Link></div>
                <div className="card-link update-button" onClick={deleteHandler}>Delete</div>
              </div>
            </div>
          </div>
      
    </div>
  )
}

export default DisplayNote
