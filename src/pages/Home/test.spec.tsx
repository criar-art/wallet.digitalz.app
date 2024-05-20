import { render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "../../store";
import HomeScreen from ".";

test("should render HomeScreen", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>
    </Provider>
  );

  expect(getByTestId("home-screen")).toBeTruthy();
});
