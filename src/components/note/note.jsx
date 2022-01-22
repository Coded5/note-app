import React from "react";

import "./note.css";

const Note = ({title, text, inSelectMode, isSelect, onOpenMenu, onTitleChange, onTextChange, onSelect, id}) => {
   const updateTextareaHight = (e) => {
      e.target.style.height = '38px';
      e.target.style.height = `${Math.min(e.target.scrollHeight, 460)}px`;
   }

   return (
      <div className="note">
         {isSelect ? 
         <div className="select-badge">
            &#x2713;
         </div> : ""}
         {(inSelectMode) ? <div className="selection" onClick={() => onSelect(id)} /> : ""}
         <input 
            className="title" 
            type="text" 
            value={title}
            onChange={(e) => {
               onTitleChange(id, e.target.value);
            }}
         /> 
         <textarea 
            className="text"  
            value={text}
            onInput={updateTextareaHight} 
            onChange={(e) => {
               onTextChange(id, e.target.value);
            }}
         />
         <div className="note-dropdown unselectable" onClick={() => onOpenMenu(id)}>
            &#10247;
         </div>
         
      </div>
   );
}

export default Note;