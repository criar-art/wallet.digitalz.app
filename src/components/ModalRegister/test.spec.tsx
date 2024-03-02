import { render } from "@testing-library/react-native";
import ModalRegister from "./index";

import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "../../__mock__/store";

test("should render ModalRegister", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <NavigationContainer>
        <ModalRegister />
      </NavigationContainer>
    </Provider>
  );

  expect(getByTestId("modal-register")).toBeTruthy();
});
