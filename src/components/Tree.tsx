import React, { useState } from "react";
import Node from "./Node";
import Arrow from "./Arrow";
import { Subject, Point, Major, isMajor } from "../Types";

export type EdgeList = {
  node: Subject | Major;
  position: Point;
  outgoingEdges: number[];
  incomingEdges: number[];
};

export type TreeProps = {
  adjList: EdgeList[];
  disp: Point;
};

export function Tree(props: TreeProps) {
  const [visible, setVisible] = useState(Array(props.adjList.length).fill(true));

  const getCSSVarDist = (name: string): number => {
    return parseInt(getComputedStyle(document.documentElement).getPropertyValue(name));
  };

  let nodeHeight = getCSSVarDist("--node-height");
  let majorNodeHeight = getCSSVarDist("--node-height-major");
  let nodeWidth = getCSSVarDist("--node-width");

  const dfsVisibility = (idx: number, outgoing: boolean, visited: boolean[], newVisible: boolean[]) => {
    if (visited[idx]) return;
    visited[idx] = true;
    newVisible[idx] = true;
    console.log(newVisible);
    if (outgoing) {
      props.adjList[idx].outgoingEdges.forEach(x => dfsVisibility(x, true, visited, newVisible));
    }
    else {
      props.adjList[idx].incomingEdges.forEach(x => dfsVisibility(x, false, visited, newVisible));
    }
  }

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
          position={{
            x: elem.position.x + props.disp.x,
            y: elem.position.y + props.disp.y
          }}
          mainColour="#004369"
          accentColour="#EDEDED"
          content={elem.node}
        />
        {elem.outgoingEdges.map((to) => {
          let heightOffset = isMajor(props.adjList[to].node)
            ? majorNodeHeight / 2
            : nodeHeight / 2;
          return (
            <Arrow
              key={props.adjList[to].node.id}
              faded={!visible[idx] || !visible[to]}
              start={{
                x: elem.position.x + nodeWidth + props.disp.x,
                y: elem.position.y + heightOffset + props.disp.y
              }}
              end={{
                x: props.adjList[to].position.x + props.disp.x,
                y: props.adjList[to].position.y + heightOffset + props.disp.y
              }}
            />
          );
        })}
      </React.Fragment>
    );
  };

  return <>{props.adjList.map((elem, idx) => renderNode(elem, idx))}</>;
}
