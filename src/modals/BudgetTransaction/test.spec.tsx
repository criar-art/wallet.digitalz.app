import { render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";

import ModalBudgetTransaction from "./index";
import store from "@store";

test("should render ModalBudgetTransaction", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <NavigationContainer>
        <ModalBudgetTransaction testID="modal-transaction" />
      </NavigationContainer>
    </Provider>
  );

  expect(getByTestId("modal-transaction")).toBeTruthy();
});
