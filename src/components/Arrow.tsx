import React from "react";
import "../styles/Arrow.css";
import { Point } from "../utils/Point";

const xCurveFactor = 0.3;
const yCurveFactor = 0.06;
const curveFactor1 = 2;
const curveFactor2 = 2;
const headRadius = 8;

type ArrowProps = {
  start: Point;
  end: Point;
  faded: boolean;
};

function Arrow(props: ArrowProps) {
  // Diff btwn start and end of arrow in canvas coords
  const diff = new Point(
    Math.abs(props.end.x - props.start.x),
    Math.abs(props.end.y - props.start.y)
  );

  // height and width of svg
  let height = diff.y + headRadius + 1;
  let width = diff.x;

  // Bottom left of svg in canvas coords
  let botLeft: Point = new Point (
    0,
    props.start.y - 1
  );

  // Top right of svg in canvas coords
  let topRight: Point = new Point (
    0,
    props.end.y + headRadius
  );

  // Handle edge cases and different arrow directions
  if (diff.y < headRadius) {
    height = 2 * headRadius;
    botLeft.y = props.end.y - headRadius;
    topRight.y = props.end.y + headRadius;
  } else if (props.end.y < props.start.y) {
    botLeft.y = props.end.y - headRadius;
    topRight.y = props.start.y + 1;
  }

  if (diff.x < headRadius) {
    width = headRadius;
  }

  if (props.start.x < props.end.x) {
    botLeft.x = props.start.x;
    topRight.x = props.end.x;
  } else {
    botLeft.x = props.end.x;
    topRight.x = props.start.x;
  }

  const toSvgCoords = (canvasCoord: Point, botLeft: Point, topRight: Point) => {
    return new Point(
      canvasCoord.x - botLeft.x,
      topRight.y - canvasCoord.y
    );
  };

  const svgLineStart: Point = toSvgCoords(props.start, botLeft, topRight);
  const svgLineEnd: Point = toSvgCoords(props.end, botLeft, topRight);

  // if (props.start.x > props.end.x) {
  //   svgLineStart.x = diff.x;
  //   svgLineEnd.x = 0;
  //   left = props.end.x;
  // } else {
  //   left = props.start.x;
  // }

  // if (props.start.y <= props.end.y) {
  //   svgLineStart.y = diff.y + headRadius;
  //   svgLineEnd.y = headRadius;
  //   bottom = props.start.y;
  // } else bottom = props.end.y - headRadius;

  const svgLineDiff: Point = svgLineEnd.minus(svgLineStart);

  return (
    <svg
      className={"arrow" + (props.faded ? " --faded" : "")}
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      style={{ bottom: botLeft.y, left: botLeft.x }}
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
