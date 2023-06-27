/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import CheckBox from "./index";

describe("CheckBox", () => {
  test("renders correctly", () => {
    const { getByLabelText } = render(
      <CheckBox label="Test Checkbox" checked={false} onChange={() => {}} />
    );
    const checkbox = getByLabelText("Test Checkbox") as HTMLInputElement;

    expect(checkbox).toBeInTheDocument();
    expect(checkbox.checked).toBe(false);
  });

  test("handles change event", () => {
    const handleChange = jest.fn();
    const { getByLabelText } = render(
      <CheckBox label="Test Checkbox" checked={false} onChange={handleChange} />
    );
    const checkbox = getByLabelText("Test Checkbox") as HTMLInputElement;

    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledWith(true);
  });

  test("is disabled when 'disabled' prop is true", () => {
    const { getByLabelText } = render(
      <CheckBox
        label="Test Checkbox"
        disabled
        checked={false}
        onChange={() => {}}
      />
    );
    const checkbox = getByLabelText("Test Checkbox") as HTMLInputElement;

    expect(checkbox).toBeDisabled();
  });

  test("has correct color when 'color' prop is provided", () => {
    const { getByText } = render(
      <CheckBox
        label="Test Checkbox"
        color="red"
        checked={false}
        onChange={() => {}}
      />
    );
    const label = getByText("Test Checkbox");

    expect(label).toHaveStyle("color: red");
  });

  test("is checked when 'checked' prop is true", () => {
    const { getByLabelText } = render(
      <CheckBox label="Test Checkbox" checked onChange={() => {}} />
    );
    const checkbox = getByLabelText("Test Checkbox") as HTMLInputElement;

    expect(checkbox.checked).toBe(true);
  });
});
