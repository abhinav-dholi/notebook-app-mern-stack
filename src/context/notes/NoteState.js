import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{

    const notesInitial = 
        [
            {
                "_id": "65a1c7456e0256462f9c471d",
                "user": "65a18b09d70b448649cee41b",
                "title": "My Title",
                "description": "Please wake me up early",
                "tag": "Personal",
                "date": "2024-01-12T23:12:05.316Z",
                "__v": 0
            },
            {
                "_id": "65a1c74a6e0256462f9c471f",
                "user": "65a18b09d70b448649cee41b",
                "title": "My Title",
                "description": "Please wake me up early1",
                "tag": "Personal",
                "date": "2024-01-12T23:12:10.120Z",
                "__v": 0
            },
            {
                "_id": "65a1c74d6e0256462f9c4721",
                "user": "65a18b09d70b448649cee41b",
                "title": "My Title",
                "description": "Please wake me up early2",
                "tag": "Personal",
                "date": "2024-01-12T23:12:13.880Z",
                "__v": 0
            },
            {
                "_id": "65a1c7536e0256462f9c4723",
                "user": "65a18b09d70b448649cee41b",
                "title": "My Title",
                "description": "Please wake me up early3",
                "tag": "Personal",
                "date": "2024-01-12T23:12:19.048Z",
                "__v": 0
            },
            {
                "_id": "65a1c7856e0256462f9c472d",
                "user": "65a18b09d70b448649cee41b",
                "title": "My Title",
                "description": "Please wake me early",
                "tag": "Personal",
                "date": "2024-01-12T23:13:09.131Z",
                "__v": 0
            },
            {
                "_id": "65a1c7936e0256462f9c4731",
                "user": "65a18b09d70b448649cee41b",
                "title": "My Title1",
                "description": "Please wake early",
                "tag": "Personal",
                "date": "2024-01-12T23:13:23.771Z",
                "__v": 0
            }
        ]

        const [notes, setNotes] = useState(notesInitial)
    

    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;
