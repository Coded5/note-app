import React, { useEffect, useState } from "react";

import "./note.css";

const Note = ({note_title, note_text}) => {
   const [title, setTitle] = useState("untitled");

   useEffect(() => {
      if(note_title) setTitle(note_title);
   }, []);

   const updateTextareaHight = (e) => {
      e.target.style.height = '38px';
      e.target.style.height = `${Math.min(e.target.scrollHeight, 460)}px`;
   }

   return (
      <div className="note">
         <input className="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)}/> 
         <textarea className="text" row="0" onInput={updateTextareaHight} />
      </div>
   );
}

export default Note;