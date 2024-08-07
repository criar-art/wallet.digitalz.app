import { render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "../../store";
import TransactionScreen from ".";

test("should render TransactionScreen", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <NavigationContainer>
        <TransactionScreen />
      </NavigationContainer>
    </Provider>
  );

  expect(getByTestId("transaction-screen")).toBeTruthy();
});
