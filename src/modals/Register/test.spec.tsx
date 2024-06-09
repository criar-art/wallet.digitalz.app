import { render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";

import ModalRegister from "./index";
import store from "@store";

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
