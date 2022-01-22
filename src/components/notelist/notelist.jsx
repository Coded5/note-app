import React from "react";

import Note from "../note/note";
import Toolbox from "./toolbox/toolbox";

import "./notelist.css";

const NoteList = ({folder, enabledTools, inSelectMode, selectedNote, onChange, onOpenMenu, onAddNote, onRename, onToggleSelectMode, onSelect, onDelete, onMove }) => {
   const handleTitleChange = (id, title) => {
      let new_folder = folder;
      new_folder.notes[id].title = title;
      onChange(new_folder)
   }

   const handleTextChange = (id, text) => {
      let new_folder = folder;
      new_folder.notes[id].text = text;
      onChange(new_folder);
   }

   return (
      <div className="notelist-container">
         <div className="notelist">
            <div className="toolbar">
               <h1>{folder.folder_name} ({folder.notes.length})</h1>
               <Toolbox
                  inSelectMode={inSelectMode}
                  enabledTools={enabledTools}
                  onToggleSelectMode={onToggleSelectMode}
                  onAdd={onAddNote}
                  onDelete={onDelete}
                  onMove={onMove}
                  onRename={onRename}
               />
            </div>
            <div className="notes">
               <ul className="list">
                  {
                     folder.notes.map((i, k) => (
                        <li key={k}>
                           <Note 
                              title={i.title}
                              text={i.text}

                              inSelectMode={inSelectMode}

                              isSelect={selectedNote.includes(k)}
                              onSelect={onSelect}
                              onTitleChange={handleTitleChange}
                              onTextChange={handleTextChange}
                              onOpenMenu={onOpenMenu}

                              id={k}
                           />
                        </li>
                     ))
                  }
               </ul>
            </div>
         </div>
         
      </div>
   );
}

export default NoteList;