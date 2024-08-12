import { Animated, Easing } from "react-native";

export const animationModalScale = (scaleAnimation: Animated.Value) => {
  Animated.spring(scaleAnimation, {
    toValue: 1,
    friction: 5,
    useNativeDriver: true,
  }).start();
}

export const animationModalPay = (props: any) => {
  Animated.parallel([
    Animated.sequence([
      Animated.spring(props.scaleAnimation, {
        toValue: 1.3,
        friction: 10,
        useNativeDriver: true,
      }),
      Animated.spring(props.scaleAnimation, {
        toValue: 1,
        friction: 10,
        useNativeDriver: true,
      }),
    ]),
    Animated.sequence([
      Animated.timing(props.shakeAnimation, {
        toValue: 1,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(props.shakeAnimation, {
        toValue: -1,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(props.shakeAnimation, {
        toValue: 0,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ])
  ]).start(() => {
    props.modalRef.current?.closeModal();
  })
}
