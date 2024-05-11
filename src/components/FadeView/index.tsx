import React, { useState, useCallback } from "react";
import { Animated } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { Props } from "./types";

export default function FadeView(props: Props) {
  const [fadeAnim, setFadeAmin] = useState(new Animated.Value(0));

  useFocusEffect(
    useCallback(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();

      return () => {
        setFadeAmin(new Animated.Value(0));
      };
    }, [fadeAnim])
  );

  return (
    <Animated.View
      testID={props.testID ? props.testID : "fade-view"}
      style={{
        opacity: fadeAnim,
      }}
    >
      {props.children}
    </Animated.View>
  );
}
