import { render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "../../store";
import FadeView from "./index";

test("should render FadeView", () => {
  jest.mock("@react-navigation/native", () => ({
    ...jest.requireActual("@react-navigation/native"),
    useNavigation: jest.fn(),
  }));

  const { getByTestId } = render(
    <Provider store={store}>
      <NavigationContainer>
        <FadeView testID="fade-view" />
      </NavigationContainer>
    </Provider>
  );

  expect(getByTestId("fade-view")).toBeTruthy();
});
