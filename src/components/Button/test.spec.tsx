import { render, fireEvent } from "@testing-library/react-native";
import Button from "./index";
import { MaterialIcons } from "@expo/vector-icons";

test("should render Button", () => {
  const { getByTestId } = render(<Button />);

  expect(getByTestId("button-container")).toBeTruthy();
});

test("renders correctly with text", () => {
  const { getByTestId, getByText } = render(
    <Button text="Click me" testID="myButton" />
  );

  const buttonContainer = getByTestId("myButton");
  const buttonText = getByText("Click me");

  expect(buttonContainer).toBeTruthy();
  expect(buttonText).toBeTruthy();
});

test("renders correctly with icon", () => {
  const { getByTestId, getByText } = render(
    <Button
      text="Button Test"
      icon={<MaterialIcons name="add-circle" size={22} color="white" />}
      testID="myButton"
    />
  );

  const buttonContainer = getByTestId("myButton");
  const icon = getByText("Button Test");

  expect(buttonContainer).toBeTruthy();
  expect(icon).toBeTruthy();
});

test("calls onPress function when pressed", () => {
  const onPressMock = jest.fn();
  const { getByTestId } = render(
    <Button onPress={onPressMock} testID="myButton" />
  );

  const buttonContainer = getByTestId("myButton");
  fireEvent.press(buttonContainer);

  expect(onPressMock).toHaveBeenCalledTimes(1);
});

test("applies custom styles correctly", () => {
  const { getByTestId } = render(
    <Button
      testID="myButton"
      backgroundColor="bg-red-600"
      textColor="text-white"
    />
  );

  const buttonContainer = getByTestId("myButton");

  expect(buttonContainer).toHaveStyle({
    backgroundColor: "#dc2626",
  });
});
