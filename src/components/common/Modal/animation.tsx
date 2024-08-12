import { Animated } from "react-native";

export const animationClose = (props: any) => {
  Animated.parallel([
    Animated.timing(props.fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }),
    Animated.timing(props.transformAnim, {
      toValue: 500,
      duration: 500,
      useNativeDriver: true,
    }),
  ]).start(() => {
    props.closeAction();
  });
}

export const animatinoOpen = (props: any) => {
  Animated.parallel([
    Animated.timing(props.fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }),
    Animated.timing(props.transformAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }),
  ]).start();
}

export const animationShake = (shakeAnimation: Animated.Value) => {
  Animated.sequence([
    Animated.timing(shakeAnimation, {
      toValue: 10,
      duration: 50,
      useNativeDriver: true,
    }),
    Animated.timing(shakeAnimation, {
      toValue: -10,
      duration: 50,
      useNativeDriver: true,
    }),
    Animated.timing(shakeAnimation, {
      toValue: 10,
      duration: 50,
      useNativeDriver: true,
    }),
    Animated.timing(shakeAnimation, {
      toValue: 0,
      duration: 50,
      useNativeDriver: true,
    }),
  ]).start();
};
