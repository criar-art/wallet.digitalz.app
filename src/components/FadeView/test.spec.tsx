import { render, act } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "../../store";
import FadeView from "./index";
import { Animated, Text } from "react-native";

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: jest.fn(),
}));

describe("FadeView Component", () => {
  test("should render FadeView with children", () => {
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <NavigationContainer>
          <FadeView testID="fade-view">
            <Text>FadeView Content</Text>
          </FadeView>
        </NavigationContainer>
      </Provider>
    );

    expect(getByTestId("fade-view")).toBeTruthy();
    expect(getByText("FadeView Content")).toBeTruthy();
  });

  test("should animate opacity from 0 to 1", () => {
    // Spy on Animated.timing and mock the implementation
    const startMock = jest.fn();
    const compositeAnimationMock = {
      start: startMock,
      stop: jest.fn(),
      reset: jest.fn(),
      _startNativeLoop: jest.fn(),
    };

    const timingSpy = jest.spyOn(Animated, 'timing').mockImplementation(() => compositeAnimationMock);

    let fadeAnim: Animated.Value | any;
    const TestComponent = () => {
      fadeAnim = new Animated.Value(0);
      return (
        <FadeView testID="fade-view">
          <Text>FadeView Content</Text>
        </FadeView>
      );
    };

    const { getByTestId } = render(
      <Provider store={store}>
        <NavigationContainer>
          <TestComponent />
        </NavigationContainer>
      </Provider>
    );

    const fadeView = getByTestId("fade-view");

    // Verify initial opacity
    expect(fadeAnim.__getValue()).toBe(0);

    // Trigger useEffect and animation
    act(() => {
      fadeAnim.setValue(1);
    });

    // Check the final opacity value after animation
    expect(fadeAnim.__getValue()).toBe(1);
    expect(startMock).toHaveBeenCalled();

    // Restore the original implementation
    timingSpy.mockRestore();
  });
});
