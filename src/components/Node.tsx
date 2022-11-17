import React from "react";
import "../styles/Node.css";
import { Colour, Major, Subject, isMajor } from "../Types";
import { Point } from "../utils/Point";
import { getCssVarInt } from "../utils/Css";

type NodeProps = {
  onClick: (x: number) => void;
  edgeListID: number;
  mainColour: Colour;
  accentColour: Colour;
  position: Point; // Position of node centre
  content: Subject | Major;
  faded: boolean;
};

function Node(props: NodeProps) {
  const nodeHeight = isMajor(props.content)
    ? getCssVarInt("--node-height-major")
    : getCssVarInt("--node-height");

  const nodeWidth = getCssVarInt("--node-width");

  return (
    <div
      className={
        "node" +
        (isMajor(props.content) ? " node--major" : "") +
        (props.faded ? " --faded" : "")
      }
      style={{
        backgroundColor: props.mainColour,
        color: props.accentColour,
        bottom: props.position.y - nodeHeight / 2,
        left: props.position.x - nodeWidth / 2
      }}
      onClick={() => props.onClick(props.edgeListID)}
    >
      <div
        className={
          "noselect node__title" + (isMajor(props.content) ? " node__title--major" : "")
        }
      >
        {props.content.name}
      </div>
      {!isMajor(props.content) && (
        <div className="noselect node__code">{props.content.code}</div>
      )}
      <div className="noselect node__type">
        {isMajor(props.content) ? props.content.course : props.content.type}
      </div>
    </div>
  );
}

export default Node;
