import React, { useEffect, useState } from "react";

import "./popup.css"

const Popup = ({ children, title, trigger, onClose }) => {
   return (trigger) ? (
      <div className="popup">
         <div className="popup-inner">
            <button className="close-btn" onClick={onClose}>Close</button>
            
            <h3>{title}</h3>
            <div className="popup-content">
               { children }
            </div>
         </div>
      </div>
   ) : "";
}

export default Popup;