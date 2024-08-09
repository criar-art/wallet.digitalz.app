import { render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import store from "../../store";
import TransactionScreen from ".";

const Stack = createBottomTabNavigator();

const TestNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Transaction" component={TransactionScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

test("should render TransactionScreen", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <TestNavigator />
    </Provider>
  );

  expect(getByTestId("transaction-screen")).toBeTruthy();
});
