import React, { useState } from "react";
import { Tree } from "./Tree";
import { Point } from "../utils/Point";
import "../styles/TreeCanvas.css";
import { useNodeSystem } from "../hooks/useNodeSystem";
import { SearchBar } from "./SearchBar";
import { useInterval } from "../hooks/useInterval";

function TreeCanvas() {
  const [dragging, setDragging] = useState(false);
  const [disp, setDisp] = useState(new Point(0, 0));
  const [mousePosition, setMousePosition] = useState(new Point(0, 0));
  const [targetDir, setTargetDir] = useState<Point | null>(null);
  const [targetSteps, setTargetSteps] = useState(0);
  const [originalDisp, setOriginalDisp] = useState(new Point(0, 0));

  const { loaded, adjList } = useNodeSystem();
  const TARGET_LERP_DELAY = 0.02;
  const TARGET_LERP_STEPS = 40;

  const onMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setMousePosition(new Point(e.clientX, e.clientY));
    setDragging(true);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    setDisp((prevDisp) => {
      return new Point(
        prevDisp.x + e.clientX - mousePosition.x,
        prevDisp.y - e.clientY + mousePosition.y
      );
    });
    setMousePosition(new Point(e.clientX, e.clientY));
  };

  useInterval(() => {
    if (targetSteps > 0) {
      setDisp((prevDisp) =>
        targetDir
          ? originalDisp.add(
              targetDir.mult(
                Math.cos((targetSteps * Math.PI) / TARGET_LERP_STEPS) / 2 + 0.5
              )
            )
          : prevDisp
      );
      setTargetSteps((prev) => prev - 1);
    }
  }, TARGET_LERP_DELAY * 1000);

  const onMouseUp = (e: React.MouseEvent) => {
    setDragging(false);
  };

  const onSearchClick = (pos: Point) => {
    setTargetDir(
      pos
        .flip()
        .add(new Point(window.innerWidth / 2, window.innerHeight / 2))
        .minus(disp)
    );
    setOriginalDisp(disp);
    setTargetSteps(TARGET_LERP_STEPS);
  };

  return (
    <div
      className="tree-canvas"
      onMouseDown={(e) => onMouseDown(e)}
      onMouseMove={(e) => onMouseMove(e)}
      onMouseUp={(e) => onMouseUp(e)}
    >
      {loaded && <SearchBar adjList={adjList} onSearchClick={onSearchClick} />}
      {loaded && <Tree disp={disp} adjList={adjList} />}
    </div>
  );
}

export default TreeCanvas;
