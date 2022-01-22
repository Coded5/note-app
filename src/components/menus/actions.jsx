import React, { useEffect, useState } from "react";

import Popup from "../popup/popup";
import MoveTool from "./move/move";
import DeleteTool from "./delete/delete";
import RenameTool from "./rename/rename";
import DeleteFolderTool from "./deleteFolder/deleteFolder";

import "./actions.css";

const titles = ["Actions", "Move", "Delete", "Rename Folder", "Delete Folder"]

const ActionMenu = ({func_open, func_close, notes, selectNotes, selectFolder, onClose, onDelete, onMove, onRename, onDeleteFolder}) => {
   const [open, setOpen] = useState(false);
   const [page, setPage] = useState(0);

   useEffect(() => {
      func_open.current = (page=0) => {setOpen(true); setPage(page)};
      func_close.current = () => { setOpen(false); setPage(0); onClose() };
   });

   const renderActionMenu = () => {
      switch(page) {
         case 0:
            return (
               <React.Fragment>
                  <div className="menu-item" onClick={() => setPage(1)}>Move</div>
                  <div className="menu-item" onClick={() => setPage(2)}>Delete</div>
               </React.Fragment>
            );
         case 1:
            return (
               <MoveTool
                  notes={notes}
                  selectedNote={selectNotes}
                  folder={selectFolder}
                  onMove={onMove}
                  onClose={func_close.current}
               />
            );
         case 2:
            return (
               <DeleteTool
                  selection={selectNotes}
                  onCancel={() => {setOpen(false); onClose()}}
                  onDelete={() => {
                     onDelete();
                     setOpen(false);
                     onClose();
                  }}
               />
            );
         case 3:
            return (
               <RenameTool
                  selectFolder={selectFolder}
                  onRename={onRename}
               />
            )
         case 4:
            return (
               <DeleteFolderTool 
                  selectFolder={selectFolder}
                  notes={notes}
                  onCancel={() => func_close.current()}
                  onDeleteFolder={() => {onDeleteFolder(); func_close.current()}}
               />
            );
         default:
            break;
      }
   }

   return (
      <Popup title={titles[page]}
         trigger={open}
         onClose={() => {setOpen(false); onClose()}}
      >
         {renderActionMenu()}
      </Popup>
   );
}

export default ActionMenu;