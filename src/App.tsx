import React from "react";
import "./App.css";
import { Node } from "./components/Node";

function App() {
  return (
    <div className="app">
      <header className="app__header">Subject Flow</header>
      <Node mainColour="#004369" accentColour="#EDEDED" title="Artificial Intelligence" code="COMP30024" type="ELECTIVE SCIENCE"/>
    </div>
  );
}

export default App;
