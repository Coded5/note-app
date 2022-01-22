import React, { useState, useRef, useEffect } from "react";
import NoteList from "../../components/notelist/notelist";
import ActionMenu from "../../components/menus/actions";

import "./dashboard.css";
import icon_folder from './folder-icon.ico';

const NOTE_TEMPLATE = {
   title: "untitled",
   text: ""
}

const FOLDER_TEMPLATE = {
   folder_name: "New Folder",
   notes: []
}

const Dashboard = ({noteData, onChange}) => {
   const [selectedFolder, setSelectedFolder] = useState(0);
   const [inSelectMode, setInSelectMode] = useState(false);
   const [selectedNotes, setSelectedNote] = useState([]);
   const [enabledTools, setEnabledTools] = useState(63);

   const  openActionMenu = useRef(null);
   const closeActionMenu = useRef(null);

   const [update, sv] = useState(0);
   const forceUpdate = () => { sv(update+1 % 2);}

   useEffect(() => {
      const moveGroup = 16 * Number(inSelectMode && selectedNotes.length > 0);
      const deleteGroup = 8 * Number(inSelectMode && selectedNotes.length > 0);
      const add = 4 * Number(true);
      const renameFolder = 2 * Number(true);
      const selectGroup = 1 * Number(true);
      setEnabledTools(moveGroup | deleteGroup | add | renameFolder | selectGroup);
   }, [inSelectMode, selectedNotes, selectedFolder, update]);

   const addNote = () => {
      let new_folder = noteData[selectedFolder];
      new_folder.notes.push(NOTE_TEMPLATE);
      onChange(selectedFolder, new_folder);
   }

   const deleteNote = () => {
      let new_folder = noteData[selectedFolder];
      selectedNotes.forEach(i => {
         new_folder.notes.splice(i, 1);
      });
      onChange(selectedFolder, new_folder);
   }

   const moveNote = (selectedNotes, moveToFolder) => {
      if(moveToFolder === selectedFolder) return;

      let movedNotes = [];
      let new_from_folder = noteData[selectedFolder];
      let to_folder = noteData[moveToFolder];
      selectedNotes.forEach(note => {
         movedNotes.push(new_from_folder.notes[note]);
         new_from_folder.notes.splice(note, 1);
      });

      to_folder.notes = to_folder.notes.concat(movedNotes);
      onChange(selectedFolder, new_from_folder);
      onChange(moveToFolder, to_folder);
   }

   const selectNote = (id) => {
      let new_selection = selectedNotes;
      if(selectedNotes.includes(id)) new_selection.splice(new_selection.indexOf(id), 1);
      else new_selection.push(id);
      setSelectedNote(new_selection);
      forceUpdate();
   }

   const renameFolder = (newName) => {
      let new_folder = noteData[selectedFolder];
      new_folder.folder_name = newName;
      onChange(selectedFolder, new_folder);
   }

   const createNewFolder = () => {
      onChange(noteData.length, FOLDER_TEMPLATE);
   }

   const deleteFolder = () => {
      let new_noteData = noteData;
      new_noteData.splice(selectedFolder, 1);
      new_noteData.forEach((i, k) => {
         onChange(k, i);
      });

      setSelectedFolder(selectedFolder-1);
   }

   const resetSelection = () => {
      setSelectedNote([]);
      setInSelectMode(false);
   }

   const toggleSelect = () => {
      if(inSelectMode) setSelectedNote([]);
      setInSelectMode(!inSelectMode);
   }

   return (
      <div className="dashboard-container">
         <div className="section navigation-bar">
            <div className="navigation-account">
               <h4>Account</h4>
               <div className="account-data">
                  <span className="account-name">Nutdanai Sikkhakul</span><br/>
                  Sign out
               </div>
            </div>
            <div className="navigation-folders">
               <div className="folder-toolbox">
                  <h4>Folders ({noteData.length})</h4>
                  <div>
                     <input type="button" value="+" onClick={createNewFolder}/>
                     <input type="button" value="-" onClick={() => openActionMenu.current(4)} disabled={selectedFolder===0}/>
                  </div>
               </div>
               <ul className="folder">
                  {
                     noteData.map((i, k) => (
                        <li key={k} className="folder-item" onClick={() => {setSelectedFolder(k); resetSelection()}}>
                           <img src={icon_folder} className="icon" alt=""/>
                           <span>{i.folder_name}</span>
                        </li>
                     ))
                  }
               </ul>
            </div>
         </div>
         <div className="section dashboard">
            <NoteList
               folder={noteData[selectedFolder]}
               inSelectMode={inSelectMode}
               enabledTools={enabledTools}

               onChange={(folder) => onChange(selectedFolder, folder)}
               onDelete={() => openActionMenu.current(2)}
               onMove={() => openActionMenu.current(1)}

               onSelect={selectNote}
               selectedNote={selectedNotes}
               onToggleSelectMode={toggleSelect}
               onAddNote={addNote}
               onRename={() => openActionMenu.current(3)}
               onOpenMenu={(id) => {
                  setSelectedNote([id]);
                  openActionMenu.current();
               }}
            />
         </div>
         <ActionMenu
            func_open={openActionMenu}
            func_close={closeActionMenu}

            selectNotes={selectedNotes}
            selectFolder={selectedFolder}

            onDelete={deleteNote}
            onDeleteFolder={deleteFolder}
            onMove={moveNote}
            onRename={renameFolder}

            onClose={() => setSelectedNote([])}
            notes={noteData}
         />
      </div>
   );
}

export default Dashboard;