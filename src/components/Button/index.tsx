import { Pressable, Text, TouchableOpacity } from "react-native";
import { Props } from "./types";

function ButtonConditional(props: any) {
  if (props.pressableButton) {
    return (
      <Pressable {...props.buttonProps} className={props.buttonProps.className}>
        {props.children}
      </Pressable>
    );
  }

  return (
    <TouchableOpacity
      {...props.buttonProps}
      className={props.buttonProps.className}
    >
      {props.children}
    </TouchableOpacity>
  );
}

export default function Button(props: Props) {
  const buttonProps = {
    testID: props.testID ? props.testID : "button-container",
    className: `flex justify-center items-center flex-row rounded-lg p-2 text-center bg-gray-300 ${props.className}`,
    onPress: props.onPress,
    accessibilityLabel: props.label,
    accessibilityRole: "button",
    accessibilityState: props.accessibilityState,
    disabled: props.disabled,
  };

  return (
    <ButtonConditional
      buttonProps={buttonProps}
      pressableButton={props.pressableButton}
    >
      <>
        {props.icon}
        {props.text && (
          <Text
            className={`text-center ${props.icon ? "ml-2" : ""} ${
              props.textColor ? props.textColor : "text-white"
            }`}
          >
            {props.text}
          </Text>
        )}
      </>
    </ButtonConditional>
  );
}
