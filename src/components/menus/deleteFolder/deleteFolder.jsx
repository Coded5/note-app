import React from "react";

import "./deleteFolder.css";

const DeleteFolderTool = ({selectFolder, notes, onCancel, onDeleteFolder}) => {
   return (
      <React.Fragment>
         Are you sure that you want to delete this folder and {notes[selectFolder].notes.length} notes?
         <div className="btn-container">
            <input type="button" value="Cancel" onClick={onCancel}/>
            <input type="button" value="Yes, I am sure" onClick={onDeleteFolder}/>
         </div>
      </React.Fragment>
   );
}

export default DeleteFolderTool;