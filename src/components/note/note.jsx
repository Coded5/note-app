import React, { useEffect } from "react";

import "./note.css";

const Note = ({title, text}) => {
   useEffect(() => {
   
   }, []);

   const updateTextareaHight = (e) => {
      e.target.style.height = '0px';
      e.target.style.height = `${Math.min(e.target.scrollHeight, 460)}px`;
   }

   return (
      <div className="note">
         <input className="title" type="text" value={Boolean(title) ? title : "untitled"}/> 
         <textarea className="text" onInput={updateTextareaHight} />
      </div>
   );
}

export default Note;