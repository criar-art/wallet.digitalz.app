import { Animated } from "react-native";

export const animationLogin = (translateX: Animated.Value) => {
  Animated.loop(
    Animated.sequence([
      Animated.timing(translateX, {
        toValue: -100,
        duration: 5000,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: 0,
        duration: 5000,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: 100,
        duration: 5000,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: 0,
        duration: 5000,
        useNativeDriver: true,
      }),
    ])
  ).start();
}
