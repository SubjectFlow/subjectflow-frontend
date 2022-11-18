class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return "(" + this.x + ", " + this.y + ")";
  }

  distSq(p: Point) {
    let dx = this.x - p.x;
    let dy = this.y - p.y;
    return dx * dx + dy * dy;
  }

  dist(p: Point) {
    return Math.sqrt(this.distSq(p));
  }

  length() {
    return this.dist(new Point(0, 0));
  }

  add(p: Point) {
    return new Point(this.x + p.x, this.y + p.y);
  }

  minus(p: Point) {
    return new Point(this.x - p.x, this.y - p.y);
  }

  mult(a: number) {
    return new Point(a * this.x, a * this.y);
  }

  div(a: number) {
    if (a === 0) {
      return null;
    }

    return new Point(this.x / a, this.y / a);
  }

  flip() {
    return new Point(-this.x, -this.y);
  }

  normalise() {
    let len = this.length();
    return new Point(this.x / len, this.y / len);
  }
}

export { Point };
