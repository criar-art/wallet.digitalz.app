import { render } from "@testing-library/react-native";
import EntryScreen from "./EntryScreen";

import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "../store";

test("should render EntryScreen", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <NavigationContainer>
        <EntryScreen />
      </NavigationContainer>
    </Provider>
  );

  expect(getByTestId("entry-screen")).toBeTruthy();
});
