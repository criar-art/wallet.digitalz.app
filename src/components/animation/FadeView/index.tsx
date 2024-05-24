import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { Props } from "./types";

export default function FadeView(props: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    return () => {
      fadeAnim.setValue(0);
    };
  }, [fadeAnim]);

  return (
    <Animated.View
      testID={props.testID ? props.testID : "fade-view"}
      style={{
        opacity: fadeAnim,
      }}
      className={props.twClass}
    >
      {props.children}
    </Animated.View>
  );
}
