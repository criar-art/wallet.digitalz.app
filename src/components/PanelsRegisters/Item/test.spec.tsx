import { render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "../../../store";
import ItemList from "./index";

test("should render ItemList", () => {
  jest.mock("@react-navigation/native", () => ({
    ...jest.requireActual("@react-navigation/native"),
    useNavigation: jest.fn(),
  }));

  const { getByTestId } = render(
    <Provider store={store}>
      <NavigationContainer>
        <ItemList type="entry" value={0} />
      </NavigationContainer>
    </Provider>
  );

  expect(getByTestId("panels-registers")).toBeTruthy();
});
