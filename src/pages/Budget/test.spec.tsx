import { render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import store from "../../store";
import BudgetScreen from ".";

const Stack = createBottomTabNavigator();

test("should render BudgetScreen", () => {
  jest.mock("@react-navigation/native", () => ({
    ...jest.requireActual("@react-navigation/native"),
    useRoute: jest.fn(),
  }));

  const { getByTestId } = render(
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Transaction" component={BudgetScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );

  expect(getByTestId("budget-screen")).toBeTruthy();
});
