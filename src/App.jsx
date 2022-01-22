import React, { useState } from "react";

import { useForceUpdate } from "./toolbox";

import Dashboard from "./pages/dashboard/dashboard";

import "./App.css";

const dummy_note_data = 
[
   {
      folder_name: "Uncategorized",
      notes: [
         {
            title: "untiled",
            text: "Uncategorized content here"
         }
      ]
   },
   {
      folder_name: "My Folder",
      notes: [
         {
            title: "untiled",
            text: "My Folder content here"
         },
         {
            title: "dunno",
            text: "never gonna give you up"
         }
      ]
   },
   {
      folder_name: "Test folder",
      notes: [
         {
            title: "untiled",
            text: "You crooked desire let us in disarry"
         },
         {
            title: "dunno",
            text: "never gonna let you down"
         }
      ]
   }
]

const App = () => {
   const [ noteData, setNoteData ] = useState(dummy_note_data);
   const forceUpdate = useForceUpdate();

   const handleChange = (folder, value) => {
      let new_noteData = noteData;
      new_noteData[folder] = value;
      setNoteData(new_noteData);
      forceUpdate();
   }

   return (
      <div >
         <Dashboard 
            noteData={noteData} 
            onChange={handleChange}
         />
      </div>
   );
}

export default App;