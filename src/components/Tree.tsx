import React, { useState } from "react";
import Node from "./Node";
import Arrow from "./Arrow";
import { Subject, Point, Major, isMajor } from "../Types";

export type EdgeList = {
  node: Subject | Major;
  position: Point;
  edges: number[];
};

export type TreeProps = {
  adjList: EdgeList[];
};

export function Tree(props: TreeProps) {
  const [disp, setDisp] = useState({ x: 0, y: 0 });

  const getCSSVarDist = (name: string): number => {
    return parseInt(getComputedStyle(document.documentElement).getPropertyValue(name));
  };

  let nodeHeight = getCSSVarDist("--node-height");
  let majorNodeHeight = getCSSVarDist("--node-height-major");
  let nodeWidth = getCSSVarDist("--node-width");
  return (
    <>
      {props.adjList.map((elem) => (
        <React.Fragment key={elem.node.id}>
          <Node
            key={elem.node.id}
            position={elem.position}
            mainColour="#004369"
            accentColour="#EDEDED"
            content={elem.node}
          />
          {elem.edges.map((to) => {
            let heightOffset = isMajor(props.adjList[to].node)
              ? majorNodeHeight / 2
              : nodeHeight / 2;
            return (
              <Arrow
                key={props.adjList[to].node.id}
                start={{
                  x: elem.position.x + nodeWidth + disp.x,
                  y: elem.position.y + heightOffset + disp.y
                }}
                end={{
                  x: props.adjList[to].position.x + disp.x,
                  y: props.adjList[to].position.y + heightOffset + disp.y
                }}
              />
            );
          })}
        </React.Fragment>
      ))}
    </>
  );
}
