import { render } from "@testing-library/react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AppTabButton from "./index";

test("should render AppTabButton", () => {
  jest.mock("@react-navigation/native", () => ({
    ...jest.requireActual("@react-navigation/native"),
    useNavigation: jest.fn(),
  }));

  const { getByTestId } = render(
    <AppTabButton
      key={1}
      name="test button"
      labelButton="Test"
      isFocused={false}
      onPress={() => console.log("test")}
      onLongPress={() => console.log("test")}
      options={{
        tabBarLabel: "Test",
        title: "Test",
        tabBarAccessibilityLabel: "app-tab-button test",
        tabBarTestID: "app-tab-button",
        tabBarIcon: () => <MaterialIcons name="add" size={35} color="white" />,
        tabBarBadge: "10",
      }}
    />
  );

  expect(getByTestId("app-tab-button")).toBeTruthy();
});
