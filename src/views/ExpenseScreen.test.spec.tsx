import { render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "../store";
import ExpenseScreen from "./ExpenseScreen";

test("should render ExpenseScreen", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <NavigationContainer>
        <ExpenseScreen />
      </NavigationContainer>
    </Provider>
  );

  expect(getByTestId("expense-screen")).toBeTruthy();
});
