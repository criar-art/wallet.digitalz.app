import { render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import store from "@store";
import AppTabBar from "./index";

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: jest.fn(),
    useRoute: jest.fn().mockReturnValue({
      state: {
        routes: [
          {"key": "Home-test", "name": "Home", "params": undefined},
          {"key": "Expense-test", "name": "Expense", "params": undefined}],
      },
    }),
  };
});

const Tab = createBottomTabNavigator();

const TestScreen = () => null;

test("should render AppTabBar", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator tabBar={(props) => <AppTabBar type="wallet" {...props} />}>
          <Tab.Screen name="Test" component={TestScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );

  expect(getByTestId("app-tab-bar")).toBeTruthy();
});
