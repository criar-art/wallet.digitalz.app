import { render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "@store";
import Modal from "./index";

test("should render Modal", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <NavigationContainer>
        <Modal
          type="window"
          isOpen={false}
          testID="modal-test"
          closeAction={() => null}
          confirmAction={() => null}
          confirmButton={{
            text: "Entendi",
            label: "Ok fechar o modal de teste",
          }}
        />
      </NavigationContainer>
    </Provider>
  );

  expect(getByTestId("modal-test")).toBeTruthy();
});
