import React from "react";
import Node from "./Node";
import Arrow from "./Arrow";
import { Point } from "../utils/Point";
import { getCssVarInt } from "../utils/Css";
import { EdgeList } from "../hooks/useNodeSystem";

export type TreeProps = {
  disp: Point;
  adjList: EdgeList[];
  visible: boolean[];
  onNodeClick: (x: number) => void;
};

export function Tree(props: TreeProps) {
  let halfNodeWidth = getCssVarInt("--node-width") / 2;

  const renderNode = (elem: EdgeList, idx: number) => {
    return (
      <React.Fragment key={idx}>
        <Node
          onClick={props.onNodeClick}
          key={idx}
          faded={!props.visible[idx]}
          edgeListID={idx}
          position={elem.position.add(props.disp)}
          mainColour="#004369"
          accentColour="#EDEDED"
          content={elem.node}
        />
        {elem.outgoingEdges.map((to) => {
          return (
            <Arrow
              key={props.adjList[to].node.id}
              faded={!props.visible[idx] || !props.visible[to]}
              start={
                new Point(
                  elem.position.x + halfNodeWidth + props.disp.x,
                  elem.position.y + props.disp.y
                )
              }
              end={
                new Point(
                  props.adjList[to].position.x + props.disp.x - halfNodeWidth,
                  props.adjList[to].position.y + props.disp.y
                )
              }
            />
          );
        })}
      </React.Fragment>
    );
  };

  return <>{props.adjList.map((elem, idx) => renderNode(elem, idx))}</>;
}
