import React from "react";
import "../styles/Node.css";
import { Colour, Major, Point, Subject, isMajor } from "../Types";

type NodeProps = {
  onClick: (x: number) => void;
  edgeListID: number;
  mainColour: Colour;
  accentColour: Colour;
  position: Point;
  content: Subject | Major;
  faded: boolean;
};

function Node(props: NodeProps) {
  return (
    <div
      className={
        "node" +
        (isMajor(props.content) ? " node--major" : "") +
        (props.faded ? " node--faded" : "")
      }
      style={{
        backgroundColor: props.mainColour,
        color: props.accentColour,
        bottom: props.position.y,
        left: props.position.x
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
