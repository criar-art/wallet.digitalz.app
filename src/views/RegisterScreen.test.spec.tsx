import { render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "../store";
import RegisterScreen from "./RegisterScreen";

test("should render RegisterScreen", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <NavigationContainer>
        <RegisterScreen type="entry" />
      </NavigationContainer>
    </Provider>
  );

  expect(getByTestId("entry-screen")).toBeTruthy();
});
