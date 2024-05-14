import { render } from "@testing-library/react-native";
import EmptyRegisters from "./index";

test("should render EmptyRegisters", () => {
  const { getByTestId } = render(<EmptyRegisters testID="empty-registers" />);

  expect(getByTestId("empty-registers")).toBeTruthy();
});
