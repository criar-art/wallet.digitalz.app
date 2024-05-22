import { render } from "@testing-library/react-native";
import InputText from "./index";

test("should render InputText", () => {
  const { getByTestId } = render(<InputText />);

  expect(getByTestId("input-text")).toBeTruthy();
});
