import { render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";

import ModalInfo from "./index";
import store from "@store";

test("should render ModalInfo", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <NavigationContainer>
        <ModalInfo testID="modal-info" />
      </NavigationContainer>
    </Provider>
  );

  expect(getByTestId("modal-info")).toBeTruthy();
});
