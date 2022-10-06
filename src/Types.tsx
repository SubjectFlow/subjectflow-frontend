type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

type Colour = RGB | RGBA | HEX;
type Point = {
  x: number;
  y: number;
};

export type { Colour, Point };
