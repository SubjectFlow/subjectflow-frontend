import React from "react";
import "../styles/Arrow.css";
import { Point } from "../Types";

const xCurveFactor = 0.2;
const yCurveFactor = 0.06;
const startCurveFactor = 1;
const endCurveFactor = 1;

type ArrowProps = {
  start: Point;
  end: Point;
};

function Arrow(props: ArrowProps) {
  let bottom, left;
  const diff: Point = {
    x: Math.abs(props.end.x - props.start.x),
    y: Math.abs(props.end.y - props.start.y),
  };

  let svgStart: Point = {
    x: 0,
    y: 0,
  };

  let svgEnd: Point = JSON.parse(JSON.stringify(diff));

  if (props.start.x > props.end.x) {
    svgStart.x = diff.x;
    svgEnd.x = 0;
    left = props.end.x;
  } else left = props.start.x;

  if (props.start.y <= props.end.y) {
    svgStart.y = diff.y;
    svgEnd.y = 0;
    bottom = props.start.y;
  } else bottom = props.end.y;

  const svgDiff: Point = {
    x: svgEnd.x - svgStart.x,
    y: svgEnd.y - svgStart.y,
  };

  return (
    <svg
      className="arrow"
      width={diff.x}
      height={diff.y}
      xmlns="http://www.w3.org/2000/svg"
      style={{ bottom: bottom, left: left }}
    >
      <path
        className="arrow__line"
        d={
          `M ${svgStart.x} ${svgStart.y} ` +
          `C ${svgStart.x + startCurveFactor * xCurveFactor * svgDiff.x} ` +
          `${svgStart.y + startCurveFactor * yCurveFactor * svgDiff.y}, ` +
          `${svgEnd.x - endCurveFactor * xCurveFactor * svgDiff.x} ` +
          `${svgEnd.y - endCurveFactor * yCurveFactor * svgDiff.y}, ` +
          `${svgEnd.x} ${svgEnd.y}`
        }
      />
    </svg>
  );
}

export default Arrow;
