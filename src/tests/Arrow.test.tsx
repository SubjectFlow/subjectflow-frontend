import React from "react";
import renderer from "react-test-renderer";
import { Point } from "../utils/Point";
import Arrow from "../components/Arrow";

const bottomLeft = new Point(0, 0);
const topRight = new Point(400, 400);
const topLeft = new Point(0, 400);
const bottomRight = new Point(400, 100);

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
