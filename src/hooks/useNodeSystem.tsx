import { useState } from "react";
import { Point } from "../utils/Point";
import { EdgeList } from "../components/Tree";
import { getCssVarInt } from "../utils/Css";
import { useInterval } from "./useInterval";

export type nodeSystemProps = {
  adjList: EdgeList[];
};

function useNodeSystem(props: nodeSystemProps) {
  const [adjList, setAdjList] = useState(props.adjList);
  const [netForces, setNetForces] = useState(
    Array(props.adjList.length).fill(new Point(0, 0))
  );
  const [velocities, setVelocities] = useState(
    Array(props.adjList.length).fill(new Point(0, 0))
  );

  const UPDATE_INTERVAL = 0.05;
  const ARROW_SPRING_CONST = 0.05;
  const DAMPING_CONST = 1;
  const ARROW_NATURAL_LENGTH = 200;
  const NODE_FORCE_CONST = 5000;
  const halfNodeWidth = getCssVarInt("--node-width") / 2;

  function updateVelocities() {
    let newVelocities = velocities;

    netForces.forEach((f, idx) => {
      newVelocities[idx] = velocities[idx].add(f.mult(UPDATE_INTERVAL));
    });

    setVelocities(newVelocities);
  }

  function updatePositions() {
    let newAdjList = adjList;

    adjList.forEach((p, idx) => {
      newAdjList[idx].position = adjList[idx].position.add(
        velocities[idx].mult(UPDATE_INTERVAL)
      );
    });

    setAdjList(newAdjList);
  }

  useInterval(() => {
    updatePositions();
    updateVelocities();
    setNetForces(calcNetForces());
  }, UPDATE_INTERVAL * 1000);

  function calcArrowForce(p1: Point, p2: Point) {
    let dArrow = p1.minus(p2);
    return dArrow
      .minus(dArrow.normalise().mult(ARROW_NATURAL_LENGTH))
      .mult(ARROW_SPRING_CONST);
  }

  function calcArrowForces() {
    let arrowForces = Array(props.adjList.length).fill(new Point(0, 0));

    adjList.forEach((s, idx) => {
      s.outgoingEdges.forEach((e) => {
        let curr = calcArrowForce(
          s.position.add(new Point(halfNodeWidth, 0)),
          adjList[e].position.add(new Point(-halfNodeWidth, 0))
        );

        arrowForces[idx] = arrowForces[idx].minus(curr);
        arrowForces[e] = arrowForces[e].add(curr);
      });
    });

    return arrowForces;
  }

  function calcNodeForce(p1: Point, p2: Point) {
    return p1.minus(p2).normalise().mult(NODE_FORCE_CONST).div(p1.distSq(p2));
  }

  function calcNodeForces() {
    let nodeForces = Array(props.adjList.length).fill(new Point(0, 0));

    for (let i = 0; i < adjList.length; i++) {
      for (let j = i + 1; j < adjList.length; j++) {
        let curr = calcNodeForce(adjList[i].position, adjList[j].position);
        nodeForces[i] = nodeForces[i].add(curr);
        nodeForces[j] = nodeForces[j].minus(curr);
      }
    }

    return nodeForces;
  }

  function calcDampingForces() {
    let dampingForces = Array(props.adjList.length).fill(new Point(0, 0));

    for (let i = 0; i < props.adjList.length; i++) {
      dampingForces[i] = velocities[i].flip().mult(DAMPING_CONST);
    }

    return dampingForces;
  }

  function calcNetForces() {
    let nodeForces = calcNodeForces();
    let dampingForces = calcDampingForces();
    return calcArrowForces().map((x, idx) =>
      x.add(nodeForces[idx]).add(dampingForces[idx])
    );
  }

  return adjList;
}

export { useNodeSystem };
