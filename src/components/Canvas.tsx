import React, { useState } from "react";
import { Tree, TreeProps } from "./Tree";
import "../styles/Canvas.css";

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
        x: 530,
        y: 800
      },
      outgoingEdges: [4],
      incomingEdges: [5, 6]
    },
    {
      node: {
        id: "b",
        name: "IT Project",
        code: "COMP30022",
        type: "MAJOR CORE"
      },
      position: {
        x: 500,
        y: 700
      },
      outgoingEdges: [4],
      incomingEdges: [7]
    },
    {
      node: {
        id: "c",
        name: "Software Modelling and Design",
        code: "SWEN30006",
        type: "MAJOR CORE"
      },
      position: {
        x: 500,
        y: 600
      },
      outgoingEdges: [4],
      incomingEdges: []
    },
    {
      node: {
        id: "d",
        name: "Computer Systems",
        code: "COMP30023",
        type: "MAJOR CORE"
      },
      position: {
        x: 530,
        y: 500
      },
      outgoingEdges: [4],
      incomingEdges: []
    },
    {
      node: {
        id: "e",
        name: "Computing and Software Systems",
        course: "BSCI"
      },
      position: {
        x: 900,
        y: 650
      },
      outgoingEdges: [],
      incomingEdges: [0, 1, 2, 3]
    },
    {
      node: {
        id: "f",
        name: "Algorithms and Data Structures",
        code: "COMP20003",
        type: "CORE PREREQ"
      },
      position: {
        x: 150,
        y: 900
      },
      outgoingEdges: [0],
      incomingEdges: []
    },
    {
      node: {
        id: "g",
        name: "Design of Algorithms",
        code: "COMP20007",
        type: "CORE PREREQ"
      },
      position: {
        x: 150,
        y: 800
      },
      outgoingEdges: [0],
      incomingEdges: []
    },
    {
      node: {
        id: "h",
        name: "Database Systems",
        code: "INFO20003",
        type: "CORE PREREQ"
      },
      position: {
        x: 150,
        y: 700
      },
      outgoingEdges: [1],
      incomingEdges: []
    }
  ],
  disp: {
    x: 0,
    y: 0
  }
};

function Canvas() {
  const [dragging, setDragging] = useState(false);
  const [disp, setDisp] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const onMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setPosition({ x: e.clientX, y: e.clientY });
    setDragging(true);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    setDisp((prevDisp) => {
      return {
        x: prevDisp.x + e.clientX - position.x,
        y: prevDisp.y - e.clientY + position.y
      };
    });
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const onMouseUp = (e: React.MouseEvent) => {
    setDragging(false);
  };

  return (
    <div
      className="canvas"
      onMouseDown={(e) => onMouseDown(e)}
      onMouseMove={(e) => onMouseMove(e)}
      onMouseUp={(e) => onMouseUp(e)}
    >
      <Tree adjList={hardCodedTest.adjList} disp={disp} />
    </div>
  );
}

export default Canvas;
