import { render } from "@testing-library/react-native";
import InputMoney from "./index";

test("should render InputMoney", () => {
  const { getByTestId } = render(<InputMoney />);

  expect(getByTestId("input-text")).toBeTruthy();
});
