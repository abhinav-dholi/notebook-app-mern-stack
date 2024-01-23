import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5505";
    const notesInitial =[]

    const [notes, setNotes] = useState(notesInitial)

    // Get all notes
    const getNotes = async () => {
        // TODO: API CALL
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhMThiMDlkNzBiNDQ4NjQ5Y2VlNDFiIn0sImlhdCI6MTcwNTA5NzUxNH0.2l2d41rmYwZhjutC4TfCo-6EjRRDsJgMMrZ8b9dXb2A"

            },
        });
        const json =  await response.json();
        console.log(json);
        setNotes(json)
    }

    // Add a note 
    const addNote = async (title, description, tag) => {
        console.log("adding a new note")
        // TODO: API CALL
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhMThiMDlkNzBiNDQ4NjQ5Y2VlNDFiIn0sImlhdCI6MTcwNTA5NzUxNH0.2l2d41rmYwZhjutC4TfCo-6EjRRDsJgMMrZ8b9dXb2A"

            },
            body: JSON.stringify({title, description, tag})
        });
        const json =  await response.json();

        const note = {
            "_id": "65a1c7456e0256462f9c471d",
            "user": "65a18b09d70b448649cee41b",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2024-01-12T23:12:05.316Z",
            "__v": 0
        };
        setNotes(notes.concat(note));
    }
    // delete a note 
    const deleteNote = async (id) => {
        // TODO: API CALL
        console.log("Deleting the note with id " + id)
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhMThiMDlkNzBiNDQ4NjQ5Y2VlNDFiIn0sImlhdCI6MTcwNTA5NzUxNH0.2l2d41rmYwZhjutC4TfCo-6EjRRDsJgMMrZ8b9dXb2A"

            },
        });
        const json = response.json();
        console.log(json)
        
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes);

    }
    // edit a note
    const editNote = async (id, title, description, tag) => {
        // API CALL
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhMThiMDlkNzBiNDQ4NjQ5Y2VlNDFiIn0sImlhdCI6MTcwNTA5NzUxNH0.2l2d41rmYwZhjutC4TfCo-6EjRRDsJgMMrZ8b9dXb2A"

            },
            body: JSON.stringify({title, description, tag})
        });
        const json =  await response.json();

    // Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
        const element = notes[index];
        if (element._id === id) {
            element.title = title;
            element.description = description;
            element.tag = tag;
        }

    }

}

return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
        {props.children}
    </NoteContext.Provider>
)

}

export default NoteState;

// const response = await fetch(url, {
//     method: "POST", // *GET, POST, PUT, DELETE, etc.
//     headers: {
//       "Content-Type": "application/json",
//    
//     },
//     body: JSON.stringify(data)
//   });
//   return response.json();