import React from "react";
import { render } from "@testing-library/react-native";
import InputMoney from "./index";

test("should render InputMoney", () => {
  const { getByTestId } = render(
    <InputMoney
      testID="input-money-container"
      twClass="test-class"
      label="Amount"
      value="1000.00"
      onValueChange={() => {}}
      onChangeText={() => {}}
    />
  );

  expect(getByTestId("input-money-container")).toBeTruthy();
  expect(getByTestId("input-money-label")).toBeTruthy();
  expect(getByTestId("input-money-textinput")).toBeTruthy();
});
