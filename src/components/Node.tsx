import React from "react";
import "../styles/Node.css";
import { Colour } from "../Types";

type NodeProps = {
  mainColour: Colour,
  accentColour: Colour,
  title: string,
  code: string,
  type: string
}

export function Node(props: NodeProps) {
  return (
    <div className="node" style={{ backgroundColor: props.mainColour, color: props.accentColour }}>
      <div className="node__title">{props.title}</div>
      <div className="node__code">{props.code}</div>
      <div className="node__type">{props.type}</div>
    </div>
  );
}
