import React, { useState } from "react";
import { Tree } from "./Tree";
import { Point } from "../utils/Point";
import "../styles/Canvas.css";
import { useNodeSystem } from "../hooks/useNodeSystem";

function TreeCanvas() {
  const [dragging, setDragging] = useState(false);
  const [disp, setDisp] = useState(new Point(0, 0));
  const [position, setPosition] = useState(new Point(0, 0));
  const { loaded, adjList } = useNodeSystem();

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
      {loaded && <Tree disp={disp} adjList={adjList} />}
    </div>
  );
}

export default TreeCanvas;
