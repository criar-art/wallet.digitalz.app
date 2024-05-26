import { render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "@store";
import ModalPay from "./index";

test("should render ModalPay", () => {
  jest.mock("@react-navigation/native", () => ({
    ...jest.requireActual("@react-navigation/native"),
    useNavigation: jest.fn(),
  }));

  const { getByTestId } = render(
    <Provider store={store}>
      <NavigationContainer>
        <ModalPay testID="modal-pay" />
      </NavigationContainer>
    </Provider>
  );

  expect(getByTestId("modal-pay")).toBeTruthy();
});
