import { render } from "@testing-library/react-native";
import AppDrawerButton from "./index";

test("should render AppDrawerButton", () => {
  jest.mock("@react-navigation/native", () => ({
    ...jest.requireActual("@react-navigation/native"),
    useNavigation: jest.fn(),
  }));

  const { getByTestId } = render(
    <AppDrawerButton testID="app-drawer-button" />
  );

  expect(getByTestId("app-drawer-button")).toBeTruthy();
});
