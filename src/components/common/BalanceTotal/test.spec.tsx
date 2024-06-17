import { render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "@store";
import BalanceTotal from "./index";

test("should render BalanceTotal", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <NavigationContainer>
        <BalanceTotal type="test" />
      </NavigationContainer>
    </Provider>
  );

  expect(getByTestId("balance-total")).toBeTruthy();
});
