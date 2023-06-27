/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import RadioButton from "./index";

describe("RadioButton", () => {
  test("renders correctly", () => {
    const { getByLabelText } = render(
      <RadioButton
        label="Test Radio"
        value="test"
        checked={false}
        onChange={() => {}}
      />
    );
    const radioButton = getByLabelText("Test Radio") as HTMLInputElement;

    expect(radioButton).toBeInTheDocument();
    expect(radioButton.checked).toBe(false);
  });

  test("handles change event", () => {
    const handleChange = jest.fn();
    const { getByLabelText } = render(
      <RadioButton
        label="Test Radio"
        value="test"
        checked={false}
        onChange={handleChange}
      />
    );
    const radioButton = getByLabelText("Test Radio") as HTMLInputElement;

    fireEvent.click(radioButton);

    expect(handleChange).toHaveBeenCalled();
  });

  test("is checked when 'checked' prop is true", () => {
    const { getByLabelText } = render(
      <RadioButton
        label="Test Radio"
        value="test"
        checked
        onChange={() => {}}
      />
    );
    const radioButton = getByLabelText("Test Radio") as HTMLInputElement;

    expect(radioButton.checked).toBe(true);
  });

  test("has correct value when 'value' prop is provided", () => {
    const { getByDisplayValue } = render(
      <RadioButton
        label="Test Radio"
        value="test"
        checked={false}
        onChange={() => {}}
      />
    );
    const radioButton = getByDisplayValue("test") as HTMLInputElement;

    expect(radioButton.value).toBe("test");
  });
});
