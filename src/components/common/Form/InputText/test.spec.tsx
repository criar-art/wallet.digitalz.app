import React from "react";
import { render } from "@testing-library/react-native";
import InputText from "./index";

test("should render InputText", () => {
  const { getByTestId } = render(
    <InputText
      testID="input-text-container"
      twClass="test-class"
      label="Text Input"
      value="Sample text"
      onChangeText={() => {}}
      accessibilityLabel="text-input"
    />
  );

  expect(getByTestId("input-text-container")).toBeTruthy();
  expect(getByTestId("input-text-label")).toBeTruthy();
  expect(getByTestId("input-text-textinput")).toBeTruthy();
});
