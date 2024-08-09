import { render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import store from "@store";
import Empty from "./index";

describe("Empty Component", () => {
  test("should render Empty", () => {
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <NavigationContainer>
          <Empty testID="empty-budgets" />
        </NavigationContainer>
      </Provider>
    );

    const mainContainer = getByTestId("empty-budgets");
    expect(mainContainer).toBeTruthy();

    const icon = mainContainer.findByType(MaterialCommunityIcons);
    expect(icon).toBeTruthy();
    expect(icon.props.name).toBe("sticker-alert-outline");
    expect(icon.props.size).toBe(60);
    expect(icon.props.color).toBe("black");

    const text = getByText("common.empty_register");
    expect(text).toBeTruthy();
  });
});
