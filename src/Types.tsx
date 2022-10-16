type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

type Colour = RGB | RGBA | HEX;
type Point = {
  x: number;
  y: number;
};

type Subject = {
  id: string;
  name: string;
  code: string;
  type: string;
};

type Major = {
  id: string;
  name: string;
  course: string;
};

const isMajor = (node: Subject | Major): node is Major => {
  return (node as Major).course !== undefined;
};

export type { Colour, Point, Subject, Major };
export { isMajor };
