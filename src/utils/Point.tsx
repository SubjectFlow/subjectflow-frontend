import { Point } from "../Types";

const origin = { x: 0, y: 0 };

function dist(p1: Point, p2: Point) {
  let dx = p2.x - p1.x;
  let dy = p2.y - p2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function length(p: Point) {
  return dist(origin, p);
}

function distSq(p1: Point, p2: Point) {
  let dx = p2.x - p1.x;
  let dy = p2.y - p2.y;
  return dx * dx + dy * dy;
}

function add(p1: Point, p2: Point) {
  return {
    x: p1.x + p2.x,
    y: p1.y + p2.y
  };
}

function flip(p: Point) {
  return {
    x: -p.x,
    y: -p.y
  };
}

function normalise(p: Point) {
  let len = length(p);
  return {
    x: p.x / len,
    y: p.y / len
  };
}

export const PointUtils = {
  distSq: distSq,
  dist: dist,
  add: add,
  length: length,
  flip: flip,
  normalise: normalise
};
