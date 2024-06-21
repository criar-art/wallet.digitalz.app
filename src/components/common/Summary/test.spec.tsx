import { render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "@store";
import Summary from "./index";

test("should render Summary", () => {
  jest.mock("@react-navigation/native", () => ({
    ...jest.requireActual("@react-navigation/native"),
    useNavigation: jest.fn(),
  }));

  const { getByTestId } = render(
    <Provider store={store}>
      <NavigationContainer>
        <Summary testID="summary-registers" />
      </NavigationContainer>
    </Provider>
  );

  expect(getByTestId("summary-registers")).toBeTruthy();
});
