import React from "react";
import NoteList from "../../components/notelist/notelist";

import "./dashboard.css";
import icon_folder from './folder-icon.ico';

const folders_placeholder = [
   "Folder 1",
   "Folder 2",
   "Folder 3",
   "Folder 4",
   "Folder 5",
   "Folder 6",
   
]

const Dashboard = () => {
   return (
      <div className="dashboard-container">
         <div className="section navigation-bar">
            <div className="navigation-account">
               <h4>Account</h4>
               <div className="account-data">
                  <span className="account-name">Nutdanai Sikkhakul</span><br/>
                  <a href="#">Sign out</a>
               </div>
            </div>
            <div className="navigation-folders">
               <h4>Folder</h4>
               <ul className="folder">
                  {
                     folders_placeholder.map((i, k) => (
                        <li key={k} className="folder-item"><img src={icon_folder} className="icon" /><span>{i}</span></li>
                     ))
                  }
               </ul>
            </div>
         </div>
         <div className="section dashboard">
            <NoteList />
         </div>
      </div>
   );
}

export default Dashboard;