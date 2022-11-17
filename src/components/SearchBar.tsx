import React from "react";
import { EdgeList } from "../hooks/useNodeSystem";
import "../styles/SearchBar.css";
import { ReactComponent as SearchIcon } from "../icons/search.svg";

function SearchBar(props: { adjList: EdgeList[] }) {
  return (
    <div className="search-bar">
      <input
        className="search-bar__input noselect"
        placeholder="Search"
        onMouseDown={(e) => e.stopPropagation()}
        draggable={false}
      />
      <SearchIcon className="search-bar__icon" />
    </div>
  );
}

export { SearchBar };
