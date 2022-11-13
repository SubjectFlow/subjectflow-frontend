import React from "react";
import renderer from "react-test-renderer";
import Node from "../components/Node";
import { Point } from "../utils/Point"

test("node renders test title", () => {
  const component = renderer.create(
    <Node
      onClick={(x: number) => {}}
      faded={false}
      mainColour="#004369"
      accentColour="#EDEDED"
      edgeListID={0}
      position={new Point(400, 370)}
      content={{
        id: "a",
        name: "Artificial Intelligence",
        code: "COMP30024",
        type: "ELECTIVE SCIENCE"
      }}
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
