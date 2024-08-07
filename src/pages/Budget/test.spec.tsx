import { render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "../../store";
import BudgetScreen from ".";

test("should render BudgetScreen", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <NavigationContainer>
        <BudgetScreen />
      </NavigationContainer>
    </Provider>
  );

  expect(getByTestId("budget-screen")).toBeTruthy();
});
