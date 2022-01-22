import React, { useState } from "react";

import "./move.css";

const MoveTool = ({notes, selectedNote, folder, onMove, onClose}) => {
   const [ moveTo, setMoveTo ] = useState(folder);

   return (
      <React.Fragment>
         <select className="move-select" onChange={e => setMoveTo(e.target.value)} defaultValue={folder}>
            {
               notes.map((i, k) => {
                  if(k !== folder) {
                     return (
                        <option value={k} key={k}>{i.folder_name}</option>
                     )
                  } 
                  return <option value={k} key={k} disabled>{i.folder_name}</option>
               })
            }
         </select>
         <div className="move-btn">
            <input type="button" value="Move" onClick={() => {
               onMove(selectedNote, moveTo);
               onClose();
            }}/>
         </div>
      </React.Fragment>
   );
}

export default MoveTool;