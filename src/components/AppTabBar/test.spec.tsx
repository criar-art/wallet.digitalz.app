import { render } from "@testing-library/react-native";
import AppTabBar from "./index";

test("should render AppTabBar", () => {
  const { getByTestId } = render(<AppTabBar testID="app-tab-bar" />);

  expect(getByTestId("app-tab-bar")).toBeTruthy();
});
