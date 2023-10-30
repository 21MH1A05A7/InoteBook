import React,{useContext,useEffect} from "react";
import noteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";

import { useNavigate } from "react-router-dom";


function Notes(props){
    const navigate = useNavigate();
    const context=useContext(noteContext);
    const {notes,addNote,deletenotes,getAllnotes}=context;
    const handleClick=()=>{
        console.log("Item should be deleted");
    }
    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token){
            getAllnotes();
        }
        else{
            console.log("why");
            navigate('/login');
        }
        
    },[]);
    return (
        <div className="d-flex d-flex-1">
            {notes.map((note)=>{
                return <NoteItem title={note.title} content={note.content} id={note._id}/>
            })}
            
       </div>
    )
}

export default Notes;