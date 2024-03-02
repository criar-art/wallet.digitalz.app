import { render } from "@testing-library/react-native";
import ListRegisters from "./index";

import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "../../store";

test("should render ListRegisters", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <NavigationContainer>
        <ListRegisters type="test" />
      </NavigationContainer>
    </Provider>
  );

  expect(getByTestId("list-register")).toBeTruthy();
});
