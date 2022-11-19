import React, { useRef, useState } from "react";
import { EdgeList } from "../hooks/useNodeSystem";
import "../styles/SearchBar.css";
import { ReactComponent as SearchIcon } from "../icons/search.svg";
import { Point } from "../utils/Point";
import { isMajor } from "../Types";
import { useOutsideEventListener } from "../hooks/useOutsideEventListener";

type searchBarProps = {
  adjList: EdgeList[];
  onSearchClick: (x: Point, id: number) => void;
};

function SearchBar(props: searchBarProps) {
  const [resultsVisible, setResultsVisible] = useState(false);
  const [text, setText] = useState("");
  const searchBarRef = useRef<HTMLDivElement>(null);

  useOutsideEventListener(searchBarRef, (e: Event) => {
    setResultsVisible(false);
  })

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);

    if (e.target.value === "") {
      setResultsVisible(false);
    } else {
      setResultsVisible(true);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      e.currentTarget.blur();
    }
  }

  function onBlur(e: React.FocusEvent<HTMLInputElement, Element>) {
    console.log(e.currentTarget.parentElement);
    console.log(e.relatedTarget)
    if(e.currentTarget.parentElement && !e.currentTarget.parentElement.contains(e.relatedTarget)) {
      setResultsVisible(false);
    }
  }

  function onFocus() {
    if (text !== "") {
      setResultsVisible(true);
    }
  }

  return (
    <div
      className={"search-bar" + (resultsVisible ? " search-bar--results-active" : "")}
      ref={searchBarRef}
    >
      <input
        className="search-bar__input noselect"
        placeholder="Search"
        onKeyDown={(e) => onKeyDown(e)}
        onMouseDown={(e) => e.stopPropagation()}
        onBlur={(e) => onBlur(e)}
        onFocus={() => onFocus()}
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
  onSearchClick: (x: Point, id: number) => void;
};

function ResultsPanel(props: resultsPanelProps) {
  const results: searchInfo[] = [];

  props.adjList.forEach((x, idx) => {
    let nameSearch = x.node.name.search(new RegExp(`${props.query}`, "i"));
    let codeSearch = -1;
    if (!isMajor(x.node)) {
      codeSearch = x.node.code.search(new RegExp(`${props.query}`, "i"));
    }

    if (nameSearch !== -1 || codeSearch !== -1)
      results.push({
        edgeList: x,
        edgeListID: idx,
        nameIdx: nameSearch,
        codeIdx: codeSearch
      });
  });

  let jsx;

  if (results.length !== 0)
    jsx = (
      <>
        {results.map((x) =>
          ResultEntry({
            searchInfo: x,
            onSearchClick: props.onSearchClick,
            queryLength: props.query.length
          })
        )}
      </>
    );
  else
    jsx = (
      <>
        {ResultEntry({
          searchInfo: null,
          onSearchClick: props.onSearchClick,
          queryLength: props.query.length
        })}
      </>
    );

  return <div className="search-bar__results">{jsx}</div>;
}

type searchInfo = {
  edgeList: EdgeList;
  nameIdx: number;
  codeIdx: number;
  edgeListID: number;
} | null;

type resultEntryProps = {
  searchInfo: searchInfo;
  onSearchClick: (x: Point, id: number) => void;
  queryLength: number;
};

function ResultEntry(props: resultEntryProps) {
  return (
    <div
      key={props.searchInfo ? props.searchInfo.edgeListID : null}
      tabIndex={0}
      className="search-bar__result noselect"
      onClick={() => {
        if (props.searchInfo)
          props.onSearchClick(
            props.searchInfo.edgeList.position,
            props.searchInfo.edgeListID
          );
      }}
    >
      {/* <hr className="search-bar__result__break" /> */}
      <span className="search-bar__result__title">
        {props.searchInfo ? (
          props.searchInfo.nameIdx !== -1 ? (
            <>
              {props.searchInfo.edgeList.node.name.slice(0, props.searchInfo.nameIdx)}
              <mark>
                {props.searchInfo.edgeList.node.name.slice(
                  props.searchInfo.nameIdx,
                  props.searchInfo.nameIdx + props.queryLength
                )}
              </mark>
              {props.searchInfo.edgeList.node.name.slice(
                props.searchInfo.nameIdx + props.queryLength
              )}
            </>
          ) : (
            props.searchInfo.edgeList.node.name
          )
        ) : (
          "No results"
        )}
      </span>
      <br />
      {props.searchInfo &&
        !isMajor(props.searchInfo.edgeList.node) &&
        (props.searchInfo.codeIdx !== -1 ? (
          <>
            {props.searchInfo.edgeList.node.code.slice(0, props.searchInfo.codeIdx)}
            <mark>
              {props.searchInfo.edgeList.node.code.slice(
                props.searchInfo.codeIdx,
                props.searchInfo.codeIdx + props.queryLength
              )}
            </mark>
            {props.searchInfo.edgeList.node.code.slice(
              props.searchInfo.codeIdx + props.queryLength
            )}
          </>
        ) : (
          props.searchInfo.edgeList.node.code
        ))}
    </div>
  );
}

export { SearchBar };
