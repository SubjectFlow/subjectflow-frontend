import React from "react";
import { render, screen } from "@testing-library/react";
import Node from "../components/Node";

test("renders learn react link", () => {
  render(
    <Node
      mainColour="#004369"
      accentColour="#EDEDED"
      position={{ x: 400, y: 370 }}
      title="Artificial Intelligence"
      code="COMP30024"
      type="ELECTIVE SCIENCE"
    />
  );
  const linkElement = screen.getByText(/Artificial Intelligence/i);
  expect(linkElement).toBeInTheDocument();
});
