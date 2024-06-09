import { render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";

import ModalFilter from "./index";
import store from "@store";

test("should render ModalFilter", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <NavigationContainer>
        <ModalFilter testID="modal-filter" />
      </NavigationContainer>
    </Provider>
  );

  expect(getByTestId("modal-filter")).toBeTruthy();
});
