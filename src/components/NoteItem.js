import React,{useContext} from 'react'
// import NotesState from '../context/notes/NoteState';
import noteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {


  const context=useContext(noteContext);
  const {notes,addNote,deleteNote}=context;

  const handleClick=(e)=>{
    e.preventDefault();
    deleteNote(props.id);
  }
  return (
<div className="card w-25 mt-4 me-3">
  <div className="card-body">
    <h5 className="card-title">{props.title}</h5>
    <p className="card-text">{props.content}</p>
    <a href="#" className="btn btn-primary" onClick={handleClick}>Delete</a>
  </div>
</div>
  )
}

export default NoteItem
