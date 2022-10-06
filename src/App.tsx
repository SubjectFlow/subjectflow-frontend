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
        title="Artificial Intelligence"
        code="COMP30024"
        type="ELECTIVE SCIENCE"
      />
      <Arrow start={{ x: 400, y: 100 }} end={{ x: 50, y: 50 }} />
    </div>
  );
}

export default App;
