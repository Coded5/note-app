import React from "react";

import SearchBar from "./searchbar/searchbar";
import Note from "../note/note";

import "./notelist.css";

const NoteList = () => {
   return (
      <div>
         <SearchBar/>
         <div className="notelist">
            <h1>Folder 1</h1>
            <div className="list">
               <Note/>
               <Note/>
            </div>
         </div>
      </div>
   );
}

export default NoteList;