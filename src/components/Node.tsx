import React from "react";
import "../styles/Node.css";
import { Colour, Point } from "../Types";

type NodeProps = {
  mainColour: Colour;
  accentColour: Colour;
  position: Point;
  title: string;
  code: string;
  type: string;
};

function Node(props: NodeProps) {
  return (
    <div
      className="node"
      style={{
        backgroundColor: props.mainColour,
        color: props.accentColour,
        bottom: props.position.y,
        left: props.position.x,
      }}
    >
      <div className="node__title">{props.title}</div>
      <div className="node__code">{props.code}</div>
      <div className="node__type">{props.type}</div>
    </div>
  );
}

export default Node;
