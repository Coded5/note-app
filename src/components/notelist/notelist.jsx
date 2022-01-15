import React from "react";

import SearchBar from "./searchbar/searchbar";
import Note from "../note/note";

import "./notelist.css";

const NoteList = () => {
   return (
      <div className="notelist-container">
         <div className="searchbar-container">
            <SearchBar/>
         </div>
         <div className="notelist">
            <div className="toolbar">
               <h1>Folder 1</h1>
            </div>
            <div className="notes">
               <ul className="list">
                  <li><Note/></li>
                  <li><Note/></li>
                  <li><Note/></li>
               </ul>
            </div>
         </div>
      </div>
   );
}

export default NoteList;