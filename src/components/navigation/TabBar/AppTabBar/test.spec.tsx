import { render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "../../../../store";
import AppTabBar from "./index";

test("should render AppTabBar", () => {
  jest.mock("@react-navigation/native", () => ({
    ...jest.requireActual("@react-navigation/native"),
    useNavigation: jest.fn(),
  }));

  const { getByTestId } = render(
    <Provider store={store}>
      <NavigationContainer>
        <AppTabBar />
      </NavigationContainer>
    </Provider>
  );

  expect(getByTestId("app-tab-bar")).toBeTruthy();
});
