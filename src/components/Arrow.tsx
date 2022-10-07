import React from "react";
import "../styles/Arrow.css";
import { Point } from "../Types";

const xCurveFactor = 0.3;
const yCurveFactor = 0.06;
const curveFactor1 = 2;
const curveFactor2 = 2;
const headRadius = 8;

type ArrowProps = {
  start: Point;
  end: Point;
};

function Arrow(props: ArrowProps) {
  let bottom, left;

  const diff: Point = {
    x: Math.abs(props.end.x - props.start.x),
    y: Math.abs(props.end.y - props.start.y)
  };

  let svgLineStart: Point = {
    x: 0,
    y: 0
  };

  let svgLineEnd: Point = {
    x: diff.x,
    y: diff.y
  };

  if (props.start.x > props.end.x) {
    svgLineStart.x = diff.x;
    svgLineEnd.x = 0;
    left = props.end.x;
  } else {
    left = props.start.x;
  }

  if (props.start.y <= props.end.y) {
    svgLineStart.y = diff.y + headRadius;
    svgLineEnd.y = headRadius;
    bottom = props.start.y;
  } else bottom = props.end.y;

  const svgLineDiff: Point = {
    x: svgLineEnd.x - svgLineStart.x,
    y: svgLineEnd.y - svgLineStart.y
  };

  return (
    <svg
      className="arrow"
      width={diff.x}
      height={diff.y + headRadius}
      xmlns="http://www.w3.org/2000/svg"
      style={{ bottom: bottom, left: left }}
    >
      <path
        className="arrow__line"
        d={
          `M ${svgLineStart.x} ${svgLineStart.y} ` +
          `C ${svgLineStart.x + curveFactor1 * xCurveFactor * svgLineDiff.x} ` +
          `${svgLineStart.y + curveFactor1 * yCurveFactor * svgLineDiff.y}, ` +
          `${svgLineEnd.x - curveFactor2 * xCurveFactor * svgLineDiff.x} ` +
          `${svgLineEnd.y - curveFactor2 * yCurveFactor * svgLineDiff.y}, ` +
          `${svgLineEnd.x} ${svgLineEnd.y}`
        }
      />
      <circle
        className="arrow__head"
        cx={svgLineEnd.x}
        cy={svgLineEnd.y}
        r={headRadius}
      />
    </svg>
  );
}

export default Arrow;
