import { render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "../../__mock__/store";
import ModalInfo from "./index";

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
