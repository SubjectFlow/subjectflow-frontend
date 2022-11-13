import React, { useState } from "react";
import { Tree } from "./Tree";
import { Point } from "../utils/Point";
import "../styles/Canvas.css";
import { nodeSystemProps, useNodeSystem } from "../hooks/useNodeSystem";

const hardCodedAdjList: nodeSystemProps = {
  adjList: [
    {
      node: {
        id: "a",
        name: "Models of Computation",
        code: "COMP30026",
        type: "MAJOR CORE"
      },
      position: new Point(5230, 80),
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
      position: new Point(50, 7030),
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
      position: new Point(500, 500),
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
      position: new Point(530, 500),
      outgoingEdges: [4],
      incomingEdges: []
    },
    {
      node: {
        id: "e",
        name: "Computing and Software Systems",
        course: "BSCI"
      },
      position: new Point(900, 650),
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
      position: new Point(150, 900),
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
      position: new Point(150, 800),
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
      position: new Point(150, 700),
      outgoingEdges: [1],
      incomingEdges: []
    }
  ]
};

function Canvas() {
  const [dragging, setDragging] = useState(false);
  const [disp, setDisp] = useState(new Point(0, 0));
  const [position, setPosition] = useState(new Point(0, 0));
  const adjList = useNodeSystem(hardCodedAdjList);

  const onMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setPosition(new Point(e.clientX, e.clientY));
    setDragging(true);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    setDisp((prevDisp) => {
      return new Point(
        prevDisp.x + e.clientX - position.x,
        prevDisp.y - e.clientY + position.y
      );
    });
    setPosition(new Point(e.clientX, e.clientY));
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
      <Tree adjList={adjList} disp={disp} />
    </div>
  );
}

export default Canvas;
