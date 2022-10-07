import React from "react";
import renderer from "react-test-renderer";
import Node from "../components/Node";

test("node renders test title", () => {
  const component = renderer.create(
    <Node
      mainColour="#004369"
      accentColour="#EDEDED"
      position={{ x: 400, y: 370 }}
      title="Artificial Intelligence"
      code="COMP30024"
      type="ELECTIVE SCIENCE"
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
