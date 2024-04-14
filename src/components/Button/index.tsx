import { Text, TouchableOpacity } from "react-native";
import { Props } from './types';

export default function Button(props: Props) {
  return (
    <TouchableOpacity
      testID={props.testID ? props.testID : "button-container"}
      className={`flex justify-center items-center flex-row rounded-lg p-2 text-center ${
        props.backgroundColor ? props.backgroundColor : "bg-gray-300"
      } ${props.className}`}
      onPress={props.onPress}
      accessibilityLabel={props.label}
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
    </TouchableOpacity>
  );
}
