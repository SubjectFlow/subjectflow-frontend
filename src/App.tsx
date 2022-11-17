import React from "react";
import "./App.css";
import TreeCanvas from "./components/TreeCanvas";

function App() {
  return (
    <div className="app">
      <header className="noselect app__header">Subject Flow</header>
      <TreeCanvas />
    </div>
  );
}

export default App;
