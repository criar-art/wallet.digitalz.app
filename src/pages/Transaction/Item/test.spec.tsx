import { render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "@store";
import ItemTransaction from "./index";

test("should render ItemTransaction", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <NavigationContainer>
        <ItemTransaction
          testID="item-transaction"
          item={{
            date: new Date(),
            id: "6ff62c8a-61cb-42d4-977a-4b20f8e5ca53",
            name: "Hshs",
            type: "entry",
            value: "6494",
          }}
          eyeStatus={true}
          edit={() => console.log("test")}
          remove={() => console.log("test")}
        />
      </NavigationContainer>
    </Provider>
  );

  expect(getByTestId("item-transaction")).toBeTruthy();
});
