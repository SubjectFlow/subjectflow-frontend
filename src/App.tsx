import React from "react";
import "./App.css";
import Canvas from "./components/Canvas";

function App() {
  return (
    <div className="app">
      <header className="noselect app__header">Subject Flow</header>
      <Canvas />
    </div>
  );
}

export default App;
