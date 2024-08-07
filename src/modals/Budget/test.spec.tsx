import { render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";

import ModalBudget from "./index";
import store from "@store";

test("should render ModalBudget", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <NavigationContainer>
        <ModalBudget testID="modal-budget" />
      </NavigationContainer>
    </Provider>
  );

  expect(getByTestId("modal-budget")).toBeTruthy();
});
