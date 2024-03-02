import { render } from "@testing-library/react-native";
import Button from "./index";

test("should render Button", () => {
  const { getByTestId } = render(<Button />);

  expect(getByTestId("button-container")).toBeTruthy();
});
