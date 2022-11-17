import { useEffect, useState } from "react";
import { Point } from "../utils/Point";
import { getCssVarInt } from "../utils/Css";
import { useInterval } from "./useInterval";
import { isMajor, Subject, Major } from "../Types";

export type EdgeList = {
  node: Subject | Major;
  position: Point;
  outgoingEdges: number[];
  incomingEdges: number[];
};

function useNodeSystem() {
  const [loaded, setLoaded] = useState(false);
  const [adjList, setAdjList] = useState<EdgeList[]>([]);
  // console.log(adjList)
  const [netForces, setNetForces] = useState<Point[]>([]);
  const [velocities, setVelocities] = useState<Point[]>([]);
  // console.log(netForces);
  // console.log(velocities);

  const UPDATE_INTERVAL = 0.03;
  const ARROW_SPRING_CONST = 0.2;
  const DAMPING_CONST = 1;
  const ARROW_NATURAL_LENGTH = 150;
  const SIM_SPEED = 15;
  const NODE_FORCE_CONST = 0.5;
  const NODE_FORCE_DIST = 70;
  const LEFT_CORRECTION_DIST = 80;
  const LEFT_CORRECTION_CONST = 0.1;
  const MAX_LEFT_CORRECTION = 50;

  const halfNodeWidth = getCssVarInt("--node-width") / 2;
  const halfNodeHeight = getCssVarInt("--node-height") / 2;
  const halfMajorNodeHeight = getCssVarInt("--node-height-major") / 2;
  const mCorner = halfNodeHeight / halfNodeWidth;
  const mCornerMajor = halfMajorNodeHeight / halfNodeWidth;

  useEffect(() => {
    const newAdjList = hardCodedAdjList.map((x) => {
      return { ...x, position: new Point(Math.random() * 1000, Math.random() * 1000) };
    });

    setLoaded(true);
    setAdjList(newAdjList);
    setNetForces(Array(hardCodedAdjList.length).fill(new Point(0, 0)));
    setVelocities(Array(hardCodedAdjList.length).fill(new Point(0, 0)));
  }, []);

  function updateVelocities() {
    let newVelocities = velocities;

    netForces.forEach((f, idx) => {
      newVelocities[idx] = velocities[idx].add(f.mult(UPDATE_INTERVAL));
    });

    setVelocities(newVelocities);
  }

  function updatePositions() {
    let newAdjList = adjList;
    // console.log(newAdjList)

    adjList.forEach((p, idx) => {
      newAdjList[idx].position = adjList[idx].position.add(
        velocities[idx].mult(UPDATE_INTERVAL)
      );
    });

    setAdjList(newAdjList);
  }

  useInterval(() => {
    // console.log(loaded);
    if (loaded) {
      updatePositions();
      updateVelocities();
      setNetForces(calcNetForces());
    }
  }, (UPDATE_INTERVAL * 1000) / SIM_SPEED);

  function calcArrowForce(p1: Point, p2: Point) {
    let dArrow = p1.minus(p2);
    // console.log(p1)
    // console.log(p2)
    // console.log(dArrow)
    return dArrow
      .minus(dArrow.normalise().mult(ARROW_NATURAL_LENGTH))
      .mult(ARROW_SPRING_CONST);
  }

  function calcArrowForces() {
    let arrowForces = Array(adjList.length).fill(new Point(0, 0));
    // console.log(arrowForces)

    adjList.forEach((s, idx) => {
      s.outgoingEdges.forEach((e) => {
        let curr = calcArrowForce(
          s.position.add(new Point(halfNodeWidth, 0)),
          adjList[e].position.add(new Point(-halfNodeWidth, 0))
        );

        // console.log(curr)
        // console.log(arrowForces[idx])
        arrowForces[idx] = arrowForces[idx].minus(curr);
        // arrowForces[e] = arrowForces[e].add(curr);
        // console.log(arrowForces[idx])

        let dx = s.position.x + 2 * halfNodeWidth - adjList[e].position.x;
        // console.log(dx)
        arrowForces[idx] = arrowForces[idx].add(
          new Point(-1, 0).mult(
            Math.min(
              MAX_LEFT_CORRECTION,
              Math.exp((dx + LEFT_CORRECTION_DIST) * LEFT_CORRECTION_CONST)
            )
          )
        );
        // console.log(arrowForces[idx])
      });
    });

    return arrowForces;
  }

  function calcNodeForce(p1: Point, p2: Point, major1: boolean, major2: boolean) {
    let dist = calcNodeEdgeDist(p1, p2, major1, major2);

    if (dist < NODE_FORCE_DIST) {
      console.log(Math.exp(-0.1 * (dist - NODE_FORCE_DIST)) - 1);
      return (
        p1
          .minus(p2)
          .normalise()
          // .mult((0.0008 * (dist - NODE_FORCE_CONST)) * (0.0008 * (dist - NODE_FORCE_CONST)))
          .mult(-NODE_FORCE_CONST * (dist - NODE_FORCE_DIST))
          // .mult(Math.exp(-0.07 * (dist - NODE_FORCE_DIST)) - 1);
          // .mult(Math.log(-NODE_FORCE_CONST * (dist - NODE_FORCE_DIST) + 1))
      );
    } else return new Point(0, 0);

    // return p1.minus(p2).normalise().mult(NODE_FORCE_CONST).div(p1.distSq(p2));
  }

  function calcNodeEdgeDist(p1: Point, p2: Point, major1: boolean, major2: boolean) {
    let centreDist = p1.dist(p2);
    let m = Math.abs((p2.y - p1.y) / (p2.x - p1.x));
    let halfHeight1 = major1 ? halfMajorNodeHeight : halfNodeHeight;
    let halfHeight2 = major2 ? halfMajorNodeHeight : halfNodeHeight;

    if (m === Infinity) {
      return centreDist - halfHeight1 - halfHeight2;
    } else if (isNaN(m) || m === 0) {
      return centreDist - 2 * halfNodeWidth;
    } else {
      let mCorner1 = major1 ? mCornerMajor : mCorner;
      let mCorner2 = major2 ? mCornerMajor : mCorner;
      let centreToEdge1 =
        m >= mCorner1
          ? Math.sqrt(halfHeight1 * halfHeight1 + (halfHeight1 / m) * (halfHeight1 / m))
          : Math.sqrt(halfNodeWidth * halfNodeWidth * (1 + m * m));
      let centreToEdge2 =
        m >= mCorner2
          ? Math.sqrt(halfHeight2 * halfHeight2 + (halfHeight2 / m) * (halfHeight2 / m))
          : Math.sqrt(halfNodeWidth * halfNodeWidth * (1 + m * m));

      return centreDist - centreToEdge1 - centreToEdge2;
    }
  }

  function calcNodeForces() {
    let nodeForces = Array(adjList.length).fill(new Point(0, 0));

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
    let dampingForces = Array(adjList.length).fill(new Point(0, 0));

    for (let i = 0; i < adjList.length; i++) {
      dampingForces[i] = velocities[i].flip().mult(DAMPING_CONST);
    }

    return dampingForces;
  }

  function calcNetForces() {
    // console.log(adjList)
    let nodeForces = calcNodeForces();
    // console.log(nodeForces)
    let dampingForces = calcDampingForces();
    // console.log(dampingForces)
    //   console.log(calcArrowForces().map((x, idx) => { console.log(x);
    //   return x.add(nodeForces[idx]).add(dampingForces[idx])}
    // ))
    return calcArrowForces().map((x, idx) =>
      x.add(nodeForces[idx]).add(dampingForces[idx])
    );
  }

  return { adjList, loaded };
}

let hardCodedAdjList: EdgeList[] = [
  {
    node: {
      id: "a",
      name: "Models of Computation",
      code: "COMP30026",
      type: "MAJOR CORE"
    },
    position: new Point(530, 800),
    outgoingEdges: [4],
    incomingEdges: [5, 6]
  },
  {
    node: {
      id: "b",
      name: "IT Project",
      code: "COMP30022",
      type: "MAJOR CORE"
    },
    position: new Point(500, 700),
    outgoingEdges: [4],
    incomingEdges: [7]
  },
  {
    node: {
      id: "c",
      name: "Software Modelling and Design",
      code: "SWEN30006",
      type: "MAJOR CORE"
    },
    position: new Point(500, 600),
    outgoingEdges: [4],
    incomingEdges: []
  },
  {
    node: {
      id: "d",
      name: "Computer Systems",
      code: "COMP30023",
      type: "MAJOR CORE"
    },
    position: new Point(530, 0),
    outgoingEdges: [4],
    incomingEdges: []
  },
  {
    node: {
      id: "e",
      name: "Computing and Software Systems",
      course: "BSCI"
    },
    position: new Point(900, 650),
    outgoingEdges: [],
    incomingEdges: [0, 1, 2, 3]
  },
  {
    node: {
      id: "f",
      name: "Algorithms and Data Structures",
      code: "COMP20003",
      type: "CORE PREREQ"
    },
    position: new Point(150, 900),
    outgoingEdges: [0],
    incomingEdges: []
  },
  {
    node: {
      id: "g",
      name: "Design of Algorithms",
      code: "COMP20007",
      type: "CORE PREREQ"
    },
    position: new Point(150, 800),
    outgoingEdges: [0],
    incomingEdges: []
  },
  {
    node: {
      id: "h",
      name: "Database Systems",
      code: "INFO20003",
      type: "CORE PREREQ"
    },
    position: new Point(0, 700),
    outgoingEdges: [1],
    incomingEdges: []
  }
];

export { useNodeSystem };
