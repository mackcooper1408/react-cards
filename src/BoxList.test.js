import React from "react";
import { render, fireEvent } from "@testing-library/react";

import BoxList from "./BoxList";

it("renders without crashing", function () {
  render(<BoxList />);
});


it("matches snapshot", function () {
  const { asFragment } = render(<BoxList />);
  expect(asFragment()).toMatchSnapshot();
});


it("can add a new item", function () {
  const { getByLabelText, queryByText, container, debug } = render(<BoxList />);

  // no items yet
  expect(container.querySelector(".Box")).not.toBeInTheDocument();
  // expect(queryByText("ice cream: 100")).not.toBeInTheDocument();

  const heightInput = getByLabelText("Height:");
  const widthInput = getByLabelText("Width:");
  const bgInput = getByLabelText("Background Color:");
  const submitBtn = queryByText("Add a new box!");

  // fill out the form
  fireEvent.change(heightInput, {target: { value: 100 } });
  fireEvent.change(widthInput, {target: { value: 100 } });
  fireEvent.change(bgInput, {target: { value: "blue" } });
  fireEvent.click(submitBtn);

  // grab new box
  const box = container.querySelector(".Box");
  const styleWidth = box.style.width;
  const styleHeight = box.style.height;
  const styleBackgroundColor = box.style["background-color"];
  console.log("style ---> ", styleWidth);
  debug(box);
  // expect box to be on page
  expect(box).toBeInTheDocument();
  expect(styleHeight).toEqual("100px");
  expect(styleWidth).toEqual("100px");
  expect(styleBackgroundColor).toEqual("blue");

});
