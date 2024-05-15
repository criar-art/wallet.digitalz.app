import { render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "../../store";
import ListRegisters from "./index";

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
