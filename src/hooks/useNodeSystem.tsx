import { useState } from "react";
import { Point } from "../utils/Point";
import { EdgeList } from "../components/Tree";
import { getCssVarInt } from "../utils/Css";
import { useInterval } from "./useInterval";
import { isMajor } from "../Types";

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
  const ARROW_SPRING_CONST = 0.2;
  const DAMPING_CONST = 1;
  const ARROW_NATURAL_LENGTH = 200;
  const SIM_SPEED = 15;
  const NODE_FORCE_CONST = 0.5;
  const NODE_FORCE_DIST = 100;
  const LEFT_CORRECTION_DIST = 100;
  const LEFT_CORRECTION_CONST = 0.1;
  const halfNodeWidth = getCssVarInt("--node-width") / 2;
  const halfNodeHeight = getCssVarInt("--node-height") / 2;
  const halfMajorNodeHeight = getCssVarInt("--node-height-major") / 2;

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
  }, (UPDATE_INTERVAL * 1000) / SIM_SPEED);

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
        // arrowForces[e] = arrowForces[e].add(curr);

        let dx = s.position.x + 2 * halfNodeWidth - adjList[e].position.x;
        arrowForces[idx] = arrowForces[idx].add(
          new Point(-1, 0).mult(
            Math.exp((dx + LEFT_CORRECTION_DIST) * LEFT_CORRECTION_CONST)
          )
        );
      });
    });

    return arrowForces;
  }

  function calcNodeForce(p1: Point, p2: Point, major1: boolean, major2: boolean) {
    let halfNode1Height = major1 ? halfMajorNodeHeight : halfNodeHeight;
    let halfNode2Height = major2 ? halfMajorNodeHeight : halfNodeHeight;

    let dist;

    if (p2.x - p1.x !== 0) {
      let m = (p2.y - p1.y) / (p2.x - p1.x);

      if (m === 0) {
        dist = p1.dist(p2) - 2 * halfNodeWidth;
      } else {
        let c = p1.y - m * p1.x;
        let p1int;
        let p2int;

        if (m > 0) {
          if (p2.x > p1.x) {
            if (p1.y + m * halfNodeWidth < p1.y + halfNode1Height) {
              p1int = new Point(p1.x + halfNodeWidth, p1.y + m * halfNodeWidth);
            } else {
              p1int = new Point(p1.x + halfNode1Height / m, p1.y + halfNode1Height);
            }
            if (m * (p2.x - halfNodeWidth) + c > p2.y - halfNode2Height) {
              p2int = new Point(p2.x - halfNodeWidth, m * (p2.x - halfNodeWidth) + c);
            } else {
              p2int = new Point(
                (p2.y - halfNode2Height - c) / m,
                p2.y - halfNode2Height
              );
            }
          } else {
            if (p1.y - m * halfNodeWidth > p1.y - halfNode1Height) {
              p1int = new Point(p1.x - halfNodeWidth, p1.y - m * halfNodeWidth);
            } else {
              p1int = new Point(p1.x - halfNode1Height / m, p1.y - halfNode1Height);
            }
            if (m * (p2.x + halfNodeWidth) + c < p2.y + halfNode2Height) {
              p2int = new Point(p2.x + halfNodeWidth, m * (p2.x + halfNodeWidth) + c);
            } else {
              p2int = new Point(
                (p2.y + halfNode2Height - c) / m,
                p2.y + halfNode2Height
              );
            }
          }
        } else {
          if (p2.x > p1.x) {
            if (p1.y + m * halfNodeWidth > p1.y - halfNode1Height) {
              p1int = new Point(p1.x + halfNodeWidth, p1.y + m * halfNodeWidth);
            } else {
              p1int = new Point(p1.x - halfNode1Height / m, p1.y - halfNode1Height);
            }
            if (m * (p2.x - halfNodeWidth) + c < p2.y + halfNode2Height) {
              p2int = new Point(p2.x - halfNodeWidth, m * (p2.x - halfNodeWidth) + c);
            } else {
              p2int = new Point(
                (p2.y + halfNode2Height - c) / m,
                p2.y + halfNode2Height
              );
            }
          } else {
            if (p1.y - m * halfNodeWidth < p1.y + halfNode1Height) {
              p1int = new Point(p1.x - halfNodeWidth, p1.y - m * halfNodeWidth);
            } else {
              p1int = new Point(p1.x + halfNode1Height / m, p1.y + halfNode1Height);
            }
            if (m * (p2.x + halfNodeWidth) + c > p2.y - halfNode2Height) {
              p2int = new Point(p2.x + halfNodeWidth, m * (p2.x + halfNodeWidth) + c);
            } else {
              p2int = new Point(
                (p2.y - halfNode2Height - c) / m,
                p2.y - halfNode2Height
              );
            }
          }
        }

        dist = p1int.dist(p2int);
        let yOverlap = false;
        let xOverlap = false;
        if (
          p1.y + halfNode1Height >= p2.y - halfNode2Height &&
          p1.y + halfNode1Height <= p2.y + halfNode2Height
        ) {
          yOverlap = true;
        } else if (
          p1.y - halfNode1Height >= p2.y - halfNode2Height &&
          p1.y - halfNode1Height <= p2.y + halfNode2Height
        ) {
          yOverlap = true;
        }

        if (
          p1.x - halfNodeWidth <= p2.x + halfNodeWidth &&
          p1.x - halfNodeWidth >= p2.x - halfNodeWidth
        ) {
          xOverlap = true;
        } else if (
          p1.x + halfNodeWidth <= p2.x + halfNodeWidth &&
          p1.x + halfNodeWidth >= p2.x - halfNodeWidth
        ) {
          xOverlap = true;
        }

        if (yOverlap && xOverlap) {
          dist *= -1;
        }
      }
    } else {
      let top1 = p1.y + halfNode1Height;
      let top2 = p2.y + halfNode2Height;
      let bot1 = p1.y - halfNode1Height;
      let bot2 = p2.y - halfNode2Height;

      if (top1 >= bot2) {
        if (top1 <= top2) {
          dist = top1 - bot2;
        } else {
          dist = bot1 - top2;
        }
      } else {
        dist = bot2 - top1;
      }
    }

    if (dist < NODE_FORCE_DIST) {
      return p1
        .minus(p2)
        .normalise()
        .mult(Math.log(-NODE_FORCE_CONST * (dist - NODE_FORCE_DIST) + 1));
    } else return new Point(0, 0);

    // return p1.minus(p2).normalise().mult(NODE_FORCE_CONST).div(p1.distSq(p2));
  }

  function calcNodeForces() {
    let nodeForces = Array(props.adjList.length).fill(new Point(0, 0));

    for (let i = 0; i < adjList.length; i++) {
      for (let j = i + 1; j < adjList.length; j++) {
        let curr = calcNodeForce(
          adjList[i].position,
          adjList[j].position,
          isMajor(adjList[i].node),
          isMajor(adjList[j].node)
        );
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
