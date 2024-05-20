import { render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "../../__mock__/store";
import ModalRegister from "./index";

test("should render ModalRegister", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <NavigationContainer>
        <ModalRegister testID="modal-register" />
      </NavigationContainer>
    </Provider>
  );

  expect(getByTestId("modal-register")).toBeTruthy();
});
