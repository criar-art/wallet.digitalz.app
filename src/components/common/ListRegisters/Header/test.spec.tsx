import { render } from "@testing-library/react-native";
import Header from "./index";

describe("Header Component", () => {
  test("should render Header", () => {
    const { getByTestId } = render(<Header testID="list-header" />);

    const mainContainer = getByTestId("list-header");
    expect(mainContainer).toBeTruthy();
  });
});
