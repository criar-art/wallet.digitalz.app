import { render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "../store";
import InvestimentScreen from "./InvestimentScreen";

test("should render InvestimentScreen", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <NavigationContainer>
        <InvestimentScreen />
      </NavigationContainer>
    </Provider>
  );

  expect(getByTestId("investiment-screen")).toBeTruthy();
});
