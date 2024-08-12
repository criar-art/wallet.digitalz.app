import { Animated } from "react-native";

export const animationMenuSlideUp = (menuTranslateY: Animated.Value) => {
  Animated.timing(menuTranslateY, {
    toValue: 0,
    duration: 800,
    useNativeDriver: true,
  }).start();
}

export const animationMenuSlideDown = (menuTranslateY: Animated.Value) => {
  Animated.timing(menuTranslateY, {
    toValue: 100,
    duration: 300,
    useNativeDriver: true,
  }).start();
}
