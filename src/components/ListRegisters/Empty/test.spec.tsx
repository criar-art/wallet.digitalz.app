import { render } from "@testing-library/react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Empty from "./index";

describe("Empty Component", () => {
  test("should render Empty", () => {
    const { getByTestId, getByText } = render(
      <Empty testID="empty-registers" />
    );

    const mainContainer = getByTestId("empty-registers");
    expect(mainContainer).toBeTruthy();

    const icon = mainContainer.findByType(MaterialCommunityIcons);
    expect(icon).toBeTruthy();
    expect(icon.props.name).toBe("sticker-alert-outline");
    expect(icon.props.size).toBe(60);
    expect(icon.props.color).toBe("black");

    const text = getByText("Nenhum registro cadastrado.");
    expect(text).toBeTruthy();
    expect(text.props.children).toBe("Nenhum registro cadastrado.");
  });
});