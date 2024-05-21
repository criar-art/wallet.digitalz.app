import { render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "@store";
import ModalDelete from "./index";

test("should render ModalDelete", () => {
  jest.mock("@react-navigation/native", () => ({
    ...jest.requireActual("@react-navigation/native"),
    useNavigation: jest.fn(),
  }));

  const { getByTestId } = render(
    <Provider store={store}>
      <NavigationContainer>
        <ModalDelete testID="modal-delete" />
      </NavigationContainer>
    </Provider>
  );

  expect(getByTestId("modal-delete")).toBeTruthy();
});
