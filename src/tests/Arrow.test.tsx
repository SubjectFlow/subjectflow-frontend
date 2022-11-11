import React from "react";
import renderer from "react-test-renderer";
import Arrow from "../components/Arrow";

const bottomLeft = { x: 0, y: 0 };
const topRight = { x: 400, y: 400 };
const topLeft = { x: 0, y: 400 };
const bottomRight = { x: 400, y: 100 };

test("against arrow snapshots", () => {
  let component = renderer.create(
    <Arrow faded={false} start={bottomLeft} end={topRight} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  component = renderer.create(
    <Arrow faded={false} start={topLeft} end={bottomRight} />
  );

  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  component = renderer.create(<Arrow faded={false} start={topLeft} end={bottomLeft} />);

  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  component = renderer.create(<Arrow faded={false} start={topRight} end={topLeft} />);

  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
