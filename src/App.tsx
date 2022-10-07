import React from "react";
import "./App.css";
import Arrow from "./components/Arrow";
import Node from "./components/Node";

function App() {
  return (
    <div className="app">
      <header className="app__header">Subject Flow</header>
      <HardCodedTest />
    </div>
  );
}

function HardCodedTest() {
  return (
    <>
      <Node
        mainColour="#004369"
        accentColour="#EDEDED"
        position={{ x: window.innerWidth - 870, y: window.innerHeight - 400 }}
        title="Models of Computation"
        code="COMP30026"
        type="MAJOR CORE"
      />
      <Node
        mainColour="#004369"
        accentColour="#EDEDED"
        position={{ x: window.innerWidth - 900, y: window.innerHeight - 500 }}
        title="IT Project"
        code="COMP30022"
        type="MAJOR CORE"
      />
      <Node
        mainColour="#004369"
        accentColour="#EDEDED"
        position={{ x: window.innerWidth - 900, y: window.innerHeight - 600 }}
        title="Software Modelling and Design"
        code="SWEN30006"
        type="MAJOR CORE"
      />
      <Node
        mainColour="#004369"
        accentColour="#EDEDED"
        position={{ x: window.innerWidth - 870, y: window.innerHeight - 700 }}
        title="Computer Systems"
        code="COMP30023"
        type="MAJOR CORE"
      />
      <Node
        mainColour="#585858"
        accentColour="#D2D2D2"
        position={{ x: window.innerWidth - 400, y: window.innerHeight - 550 }}
        title="Computing and Software Systems"
        type="MAJOR, BSCI"
        major={true}
      />
      <Arrow
        start={{ x: window.innerWidth - 640, y: window.innerHeight - 670 }}
        end={{ x: window.innerWidth - 400, y: window.innerHeight - 517.5 }}
      />
      <Arrow
        start={{ x: window.innerWidth - 670, y: window.innerHeight - 570 }}
        end={{ x: window.innerWidth - 400, y: window.innerHeight - 517.5 }}
      />
      <Arrow
        start={{ x: window.innerWidth - 670, y: window.innerHeight - 470 }}
        end={{ x: window.innerWidth - 400, y: window.innerHeight - 517.5 }}
      />
      <Arrow
        start={{ x: window.innerWidth - 640, y: window.innerHeight - 370 }}
        end={{ x: window.innerWidth - 400, y: window.innerHeight - 517.5 }}
      />
    </>
  );
}

export default App;
