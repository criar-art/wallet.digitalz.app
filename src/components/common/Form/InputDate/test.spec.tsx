import React from "react";
import { render } from "@testing-library/react-native";
import InputDate from "./index";

test("should render InputDate", () => {
  const { getByTestId } = render(
    <InputDate
      testID="input-date-container"
      twClass="test-class"
      label="Select Date"
      value="2023-05-01"
      onChangeDate={() => {}}
      accessibilityLabel="date-picker"
    />
  );

  expect(getByTestId("input-date-container")).toBeTruthy();
  expect(getByTestId("input-date-label")).toBeTruthy();
  expect(getByTestId("input-date-pressable")).toBeTruthy();
  expect(getByTestId("input-date-value")).toBeTruthy();
});
