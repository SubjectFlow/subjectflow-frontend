import React, { useState } from "react";
import Node from "./Node";
import Arrow from "./Arrow";
import { Point } from "../utils/Point";
import { getCssVarInt } from "../utils/Css";
import { EdgeList } from "../hooks/useNodeSystem";

export type TreeProps = {
  disp: Point;
  adjList: EdgeList[];
};

export function Tree(props: TreeProps) {
  const [visible, setVisible] = useState(Array(props.adjList.length).fill(true));

  let halfNodeWidth = getCssVarInt("--node-width") / 2;

  const dfsVisibility = (
    idx: number,
    outgoing: boolean,
    visited: boolean[],
    newVisible: boolean[]
  ) => {
    if (visited[idx]) return;
    visited[idx] = true;
    newVisible[idx] = true;
    if (outgoing) {
      props.adjList[idx].outgoingEdges.forEach((x) =>
        dfsVisibility(x, true, visited, newVisible)
      );
    } else {
      props.adjList[idx].incomingEdges.forEach((x) =>
        dfsVisibility(x, false, visited, newVisible)
      );
    }
  };

  const onNodeClick = (edgeListID: number) => {
    let newVisible = Array(visible.length).fill(false);
    dfsVisibility(edgeListID, true, Array(visible.length).fill(false), newVisible);
    dfsVisibility(edgeListID, false, Array(visible.length).fill(false), newVisible);
    setVisible(newVisible);
    console.log(newVisible);
  };

  const renderNode = (elem: EdgeList, idx: number) => {
    return (
      <React.Fragment key={idx}>
        <Node
          onClick={onNodeClick}
          key={idx}
          faded={!visible[idx]}
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
              faded={!visible[idx] || !visible[to]}
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
