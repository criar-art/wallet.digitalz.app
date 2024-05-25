import { render, fireEvent } from "@testing-library/react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "./index";

test("should render Button", () => {
  const { getByTestId } = render(<Button label="teste" />);

  expect(getByTestId("button-container")).toBeTruthy();
});

test("renders correctly with text", () => {
  const { getByTestId, getByText } = render(
    <Button text="Click me" testID="myButton" label="Label accessiblity" />
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
      label="Label accessiblity"
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
    <Button
      onPress={onPressMock}
      testID="myButton"
      label="Label accessiblity"
    />
  );

  const buttonContainer = getByTestId("myButton");
  fireEvent.press(buttonContainer);

  expect(onPressMock).toHaveBeenCalledTimes(1);
});

test("applies custom styles correctly", () => {
  const { getByTestId } = render(
    <Button
      testID="myButton"
      twClass="bg-red-600"
      textColor="text-white"
      label="Label accessiblity"
    />
  );

  const buttonContainer = getByTestId("myButton");

  expect(buttonContainer).toHaveStyle({
    backgroundColor: "#d1d5db",
  });
});
