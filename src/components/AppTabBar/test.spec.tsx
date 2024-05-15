import { render } from "@testing-library/react-native";
import AppTabBar from "./index";

import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "../../store";

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
