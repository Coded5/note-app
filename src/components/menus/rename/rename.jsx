import React, { useState } from "react";

import "./rename.css";

const RenameTool = ({onRename}) => {
   const [newName, setNewName] = useState("");
   const [errorMessage, setErrorMessage] = useState("");

   const validateNewName = () => {
      if(newName === "") {
         setErrorMessage("Please enter new name!");
      }

      onRename(newName);
   }

   return (
      <React.Fragment>
         <input type="text" className="rename" onChange={e => setNewName(e.target.value)} />
         <div className="bottom">
            <div className="error">{errorMessage}</div>
            <div className="rename-btn">
               
               <input type="button" value="Rename" onClick={validateNewName}/>
            </div>
         </div>
      </React.Fragment>
   );
}

export default RenameTool;