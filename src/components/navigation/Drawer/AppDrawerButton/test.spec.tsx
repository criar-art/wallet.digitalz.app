import { render } from "@testing-library/react-native";
import AppDrawerButton from "./index";

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: jest.fn(),
}));

test("should render AppDrawerButton", () => {
  const { getByTestId } = render(
    <AppDrawerButton testID="app-drawer-button" />
  );

  expect(getByTestId("app-drawer-button")).toBeTruthy();
});
