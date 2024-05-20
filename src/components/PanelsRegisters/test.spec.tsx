import { render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "../../store";
import PanelsRegisters from "./index";

test("should render PanelsRegisters", () => {
  jest.mock("@react-navigation/native", () => ({
    ...jest.requireActual("@react-navigation/native"),
    useNavigation: jest.fn(),
  }));

  const { getByTestId } = render(
    <Provider store={store}>
      <NavigationContainer>
        <PanelsRegisters testID="panels-registers" />
      </NavigationContainer>
    </Provider>
  );

  expect(getByTestId("panels-registers")).toBeTruthy();
});
