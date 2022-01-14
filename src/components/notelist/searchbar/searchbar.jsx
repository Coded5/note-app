import React from "react";

import "./searchbar.css";
import icon_search from './icon_search.png';

const SearchBar = () => {
   return (
      <div className="searchbar">
         <form className="searchbar-form" >
            <img src={icon_search} className="icon"/>
            <input type="text" />
         </form>
      </div>
   );
}

export default SearchBar;