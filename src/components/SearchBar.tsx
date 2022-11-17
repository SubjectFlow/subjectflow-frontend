import React, { useState } from "react";
import { EdgeList } from "../hooks/useNodeSystem";
import "../styles/SearchBar.css";
import { ReactComponent as SearchIcon } from "../icons/search.svg";
import { Point } from "../utils/Point";
import { isMajor } from "../Types";

type searchBarProps = { adjList: EdgeList[]; onSearchClick: (x: Point) => void };

function SearchBar(props: searchBarProps) {
  const [resultsVisible, setResultsVisible] = useState(false);
  const [text, setText] = useState("");

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);

    if (e.target.value === "") {
      setResultsVisible(false);
    } else {
      setResultsVisible(true);
    }
  }

  return (
    <div
      className={"search-bar" + (resultsVisible ? " search-bar--results-active" : "")}
    >
      <input
        className="search-bar__input noselect"
        placeholder="Search"
        onMouseDown={(e) => e.stopPropagation()}
        onChange={(e) => onChange(e)}
        draggable={false}
      />
      <SearchIcon className="search-bar__icon" />
      {resultsVisible && (
        <ResultsPanel
          query={text}
          adjList={props.adjList}
          onSearchClick={props.onSearchClick}
        />
      )}
    </div>
  );
}

type resultsPanelProps = {
  query: string;
  adjList: EdgeList[];
  onSearchClick: (x: Point) => void;
};

function ResultsPanel(props: resultsPanelProps) {
  const results = props.adjList.filter(
    (x) =>
      x.node.name.match(new RegExp(`${props.query}`, "i")) ||
      (!isMajor(x.node) && x.node.code.match(new RegExp(`${props.query}`, "i")))
  );
  let jsx;

  if (results.length !== 0)
    jsx = (
      <>
        {results.map((x) =>
          ResultEntry({ edgeList: x, onSearchClick: props.onSearchClick })
        )}
      </>
    );
  else jsx = <>{ResultEntry({ edgeList: null, onSearchClick: props.onSearchClick })}</>;

  return <div className="search-bar__results">{jsx}</div>;
}

type resultEntryProps = {
  edgeList: EdgeList | null;
  onSearchClick: (x: Point) => void;
};

function ResultEntry(props: resultEntryProps) {
  return (
    <div
      className="search-bar__result noselect"
      onClick={() => {
        if (props.edgeList) props.onSearchClick(props.edgeList.position);
      }}
    >
      <hr className="search-bar__result__break" />
      <span className="search-bar__result__title">
        {props.edgeList ? props.edgeList.node.name : "No results"}
      </span>
      <br />
      {props.edgeList && !isMajor(props.edgeList.node) && props.edgeList.node.code}
    </div>
  );
}

export { SearchBar };
