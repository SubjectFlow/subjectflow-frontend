import React from "react";
import renderer from "react-test-renderer";
import Arrow from "../components/Arrow";

test("against arrow snapshots", () => {
  let component = renderer.create(
    <Arrow start={{ x: 0, y: 0 }} end={{ x: 400, y: 400 }} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  component = renderer.create(
    <Arrow start={{ x: 0, y: 400 }} end={{ x: 400, y: 100 }} />
  );

  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  component = renderer.create(
    <Arrow start={{ x: 400, y: 400 }} end={{ x: 100, y: 100 }} />
  );

  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  component = renderer.create(
    <Arrow start={{ x: 400, y: 0 }} end={{ x: 100, y: 400 }} />
  );

  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
