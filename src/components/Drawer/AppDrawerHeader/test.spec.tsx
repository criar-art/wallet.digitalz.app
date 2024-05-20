import { render } from "@testing-library/react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AppDrawerHeader from "./index";

test("should render AppDrawerHeader", () => {
  jest.mock("@react-navigation/native", () => ({
    ...jest.requireActual("@react-navigation/native"),
    useNavigation: jest.fn(),
  }));

  const { getByTestId } = render(
    <AppDrawerHeader />
  );

  expect(getByTestId("app-drawer-header")).toBeTruthy();
});
