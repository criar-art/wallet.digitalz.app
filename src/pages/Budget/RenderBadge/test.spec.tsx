import { render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "@store";
import RenderBadge from "./index";

test("should render RenderBadge", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <NavigationContainer>
        <RenderBadge
          testID="badge-test"
          type="complete"
        />
      </NavigationContainer>
    </Provider>
  );

  expect(getByTestId("badge-test")).toBeTruthy();
});
