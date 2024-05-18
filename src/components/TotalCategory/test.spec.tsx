import { render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "../../store";
import TotalCategory from "./index";

test("should render TotalCategory", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <NavigationContainer>
        <TotalCategory type="test" orientation={1} />
      </NavigationContainer>
    </Provider>
  );

  expect(getByTestId("total-category")).toBeTruthy();
});
