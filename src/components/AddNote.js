import React,{useContext, useState} from 'react'
import Nav from './navbar'
import noteContext from "../context/notes/NoteContext";


const AddNote = () => {
    const context=useContext(noteContext);
    const {notes,addNote}=context;


    const [note,setNote] = useState({title:"",content:""})
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }

    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note);
    }


  return (
      <div className="container">
        <Nav />
        <h1>Notes</h1>
        <form className="">
            <div className="mb-3">
                 <label for="exampleInputEmail1" className="form-label">Title</label>
                 <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="title" onChange={onChange}/>
            </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" className="form-label">Content</label>
    <input type="text" className="form-control" id="exampleInputPassword1" name="content" onChange={onChange}/>
  </div>

  <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
</form>
    </div>
  )
}

export default AddNote
