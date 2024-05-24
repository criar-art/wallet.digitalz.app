import { render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "@store";
import Header from "./index";

jest.mock("@hooks/useOrientation", () => ({
  __esModule: true,
  default: () => ({
    orientation: 1,
    landscape: false,
    portrait: true,
  }),
}));

test("should render Header", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <NavigationContainer>
        <Header testID="header-list-register" type="entry" />
      </NavigationContainer>
    </Provider>
  );

  expect(getByTestId("header-list-register")).toBeTruthy();
});
