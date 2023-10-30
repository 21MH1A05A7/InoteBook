import React,{useState} from "react";
import NoteContext from "./NoteContext";

const NotesState = (props)=>{

    const host="http://localhost:5000"
    const initnotes=[{title:"no title yet",content:"no content yet"}]

      const [notes,setNotes] = useState(initnotes);

      //get notes
      const getAllnotes=async ()=>{
        const token=localStorage.getItem("token");
        const tokenObject = JSON.parse(token);
        const tokenValue = tokenObject.token;
        console.log(tokenValue);
        await fetch(`${host}/notes/fetchnotes`,{
            method:'GET',
            headers:{
                'auth-token':tokenValue
            }
        })
        .then(response => response.json())
        .then(data => setNotes(data));
      }

      //add notes
      const addNote=async ({title,content})=>{
        const token=localStorage.getItem("token");
        const tokenObject = JSON.parse(token);
        const tokenValue = tokenObject.token;
        console.log(tokenValue);
        const note={
            "title":title,
            "content":content
        }
        const response=await fetch(`${host}/notes/addnotes`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'auth-token':tokenValue
            },
            body:JSON.stringify({title,content})
        });
        console.log(response.body);
        setNotes(notes.concat(note))
        console.log(notes);

      }
      //delete note
      const deleteNote=async (id)=>{
        console.log(id);
        const token=localStorage.getItem("token");
        const tokenObject = JSON.parse(token);
        const tokenValue = tokenObject.token;
        console.log(tokenValue);
        const response = await fetch(`${host}/notes/deletenote/${id}`,{
            method:'DELETE',
            headers:{
                'auth-token':tokenValue
            }
        })
        .then(response => response.json())
        .then(data => setNotes(data))
        // const newNotes=notes.filter((note)=>{
        //     return note._id!==id;
        // })
        // setNotes(newNotes);
      }

      //edit a Note
      const editNote=()=>{

      }

    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,getAllnotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NotesState;