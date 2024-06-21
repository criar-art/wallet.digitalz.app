import { render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "@store";
import PanelsRegisters from "./index";

const panelsData = [
  { type: "liquid", value: 100 },
  { type: "expense", value: 200 },
  { type: "entry", value: 200 },
  { type: "investment", value: 200 },
];

test("should render PanelsRegisters", () => {
  jest.mock("@react-navigation/native", () => ({
    ...jest.requireActual("@react-navigation/native"),
    useNavigation: jest.fn(),
  }));

  const { getByTestId } = render(
    <Provider store={store}>
      <NavigationContainer>
        <PanelsRegisters testID="panels-registers" list={panelsData} />
      </NavigationContainer>
    </Provider>
  );

  expect(getByTestId("panels-registers")).toBeTruthy();
});
