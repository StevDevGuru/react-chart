import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Spin } from "./index";

describe("Spin", () => {
  test("renders children correctly", () => {
    const { getByText } = render(
      <Spin spinning={false}>
        <div>Child Element</div>
      </Spin>
    );

    expect(getByText("Child Element")).toBeInTheDocument();
  });

  test("shows spinner when 'spinning' prop is true", () => {
    const { container } = render(
      <Spin spinning>
        <div>Child Element</div>
      </Spin>
    );

    expect(container.firstChild?.firstChild).toBeInTheDocument();
    expect(container.firstChild?.childNodes[1]).toBeInTheDocument();
  });

  test("does not show spinner when 'spinning' prop is false", () => {
    const { container } = render(
      <Spin spinning={false}>
        <div>Child Element</div>
      </Spin>
    );

    expect(container.firstChild?.firstChild).not.toHaveClass("spinnerOverlay");
    expect(container.firstChild?.firstChild).not.toHaveClass("spinner");
  });
});
