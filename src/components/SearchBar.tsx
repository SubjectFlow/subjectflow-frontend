import React, { useState } from "react";
import { EdgeList } from "../hooks/useNodeSystem";
import "../styles/SearchBar.css";
import { ReactComponent as SearchIcon } from "../icons/search.svg";
import { isMajor, Major, Subject } from "../Types";

function SearchBar(props: { adjList: EdgeList[] }) {
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
      {resultsVisible && <ResultsPanel query={text} adjList={props.adjList} />}
    </div>
  );
}

function ResultsPanel(props: { query: string; adjList: EdgeList[] }) {
  const results = props.adjList.filter(
    (x) =>
      x.node.name.match(new RegExp(`${props.query}`, "i")) ||
      (!isMajor(x.node) && x.node.code.match(new RegExp(`${props.query}`, "i")))
  );
  let jsx;

  if (results.length !== 0) jsx = <>{results.map((x) => ResultEntry(x.node))}</>;
  else jsx = <>{ResultEntry(null)}</>;

  return <div className="search-bar__results">{jsx}</div>;
}

function ResultEntry(content: Subject | Major | null) {
  return (
    <div className="search-bar__result">
      <hr className="search-bar__result__break" />
      <span className="search-bar__result__title">
        {content ? content.name : "No results"}
      </span>
      <br />
      {content && !isMajor(content) && content.code}
    </div>
  );
}

export { SearchBar };
