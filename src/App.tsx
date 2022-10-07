import React from "react";
import "./App.css";
import Arrow from "./components/Arrow";
import Node from "./components/Node";

function App() {
  return (
    <div className="app">
      <header className="app__header">Subject Flow</header>
      <Node
        mainColour="#004369"
        accentColour="#EDEDED"
        position={{ x: 400, y: 370 }}
        title="Artificial Intelligence"
        code="COMP30024"
        type="ELECTIVE SCIENCE"
      />
      <Arrow start={{ x: 0, y: 0 }} end={{ x: 400, y: 400 }} />
    </div>
  );
}

export default App;
