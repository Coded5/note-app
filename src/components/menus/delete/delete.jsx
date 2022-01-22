import React from "react";

import "./delete.css";

const DeleteTool = ({selection, onCancel, onDelete}) => {
   return (
      <React.Fragment>
         Do you want to delete {selection.length} item{(selection.length) !== 1 && "s"}
         <div className="delete">
            <input type="button" value="Cancel" className="delete-btn" onClick={() => onCancel()}/>
            <input type="button" value="Delete" className="delete-btn" onClick={() => onDelete()}/>
         </div>
      </React.Fragment>
   );
}

export default DeleteTool;