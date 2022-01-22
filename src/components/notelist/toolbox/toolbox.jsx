import React from "react";

import "./toolbox.css";

const Toolbox = ({enabledTools, inSelectMode, onAdd, onDelete, onToggleSelectMode, onMove, onRename}) => {
   return (
      <div className="toolbox-container">
         <button onClick={onMove}             disabled={! ((enabledTools & 16) > 0)}>Move</button>
         <button onClick={onDelete}           disabled={! ((enabledTools & 8 ) > 0)}>Delete</button>
         <button onClick={onAdd}              disabled={! ((enabledTools & 4 ) > 0)}>Add</button>
         <button onClick={onRename}           disabled={! ((enabledTools & 2 ) > 0)}>Rename</button>
         <button style={{color: (inSelectMode) ? 'white' : 'inherit'}} onClick={onToggleSelectMode} disabled={! ((enabledTools & 1 ) > 0)}>Select</button>
      </div>
   );
}

export default Toolbox;