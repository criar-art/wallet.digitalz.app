import { render } from "@testing-library/react-native";
import InputDate from "./index";

test("should render InputDate", () => {
  const { getByTestId } = render(<InputDate />);

  expect(getByTestId("input-text")).toBeTruthy();
});
