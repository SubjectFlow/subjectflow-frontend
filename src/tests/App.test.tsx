import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

test("app renders site header", () => {
  render(<App />);
  const linkElement = screen.getByText(/Subject Flow/i);
  expect(linkElement).toBeInTheDocument();
});
