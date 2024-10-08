import { render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "@store";
import ModalDuplicate from "./index";

test("should render ModalDuplicate", () => {
  jest.mock("@react-navigation/native", () => ({
    ...jest.requireActual("@react-navigation/native"),
    useNavigation: jest.fn(),
  }));

  const { getByTestId } = render(
    <Provider store={store}>
      <NavigationContainer>
        <ModalDuplicate testID="modal-duplicate" />
      </NavigationContainer>
    </Provider>
  );

  expect(getByTestId("modal-duplicate")).toBeTruthy();
});
