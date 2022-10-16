import React from "react";
import "./App.css";
import { Tree, TreeProps } from "./components/Tree";

const hardCodedTest: TreeProps = {
  adjList: [
    {
      node: {
        id: "a",
        name: "Models of Computation",
        code: "COMP30026",
        type: "MAJOR CORE"
      },
      position: {
        x: 800,
        y: 800
      },
      edges: [4]
    },
    {
      node: {
        id: "b",
        name: "IT Project",
        code: "COMP30022",
        type: "MAJOR CORE"
      },
      position: {
        x: 770,
        y: 700
      },
      edges: [4]
    },
    {
      node: {
        id: "c",
        name: "Software Modelling and Design",
        code: "SWEN30006",
        type: "MAJOR CORE"
      },
      position: {
        x: 770,
        y: 600
      },
      edges: [4]
    },
    {
      node: {
        id: "d",
        name: "Computer Systems",
        code: "COMP30023",
        type: "MAJOR CORE"
      },
      position: {
        x: 800,
        y: 500
      },
      edges: [4]
    },
    {
      node: {
        id: "e",
        name: "Computing and Software Systems",
        course: "BSCI"
      },
      position: {
        x: 1270,
        y: 650
      },
      edges: []
    }
  ]
};

function App() {
  return (
    <div className="app">
      <header className="app__header">Subject Flow</header>
      <Tree adjList={hardCodedTest.adjList} />
    </div>
  );
}

export default App;
