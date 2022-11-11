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
        x: 130,
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
        x: 100,
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
        x: 100,
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
        x: 130,
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
        x: 600,
        y: 650
      },
      edges: []
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

  const onMouseLeave = (e: React.MouseEvent) => {
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
