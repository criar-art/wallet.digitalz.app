import { render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "@store";
import AppDrawerContent from "./index";

test("should render AppDrawerContent", () => {
  jest.mock("@react-navigation/native", () => ({
    ...jest.requireActual("@react-navigation/native"),
    useNavigation: jest.fn(),
  }));

  const { getByTestId } = render(
    <Provider store={store}>
      <NavigationContainer>
        <AppDrawerContent />
      </NavigationContainer>
    </Provider>
  );

  expect(getByTestId("app-drawer-content")).toBeTruthy();
});
