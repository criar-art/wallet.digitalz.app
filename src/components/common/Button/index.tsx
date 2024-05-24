import { Pressable, Text, TouchableOpacity } from "react-native";
import { Props } from "./types";

export default function Button(props: Props) {
  const ButtonComponent = props.pressableButton ? Pressable : TouchableOpacity;

  return (
    <ButtonComponent
      testID={props.testID ? props.testID : "button-container"}
      className={`flex justify-center items-center flex-row rounded-lg p-2 text-center bg-gray-300 ${props.twClass}`}
      onPress={props.onPress}
      accessibilityLabel={props.label}
      accessibilityState={props.accessibilityState}
      disabled={props.disabled}
      accessibilityRole="button"
    >
      <>
        {props.icon && props.icon}
        {props.text && (
          <Text
            className={`text-center ${props.icon ? "ml-4" : ""} ${
              props.textColor ? props.textColor : "text-white"
            }`}
          >
            {props.text}
          </Text>
        )}
        {props.children}
      </>
    </ButtonComponent>
  );
}
