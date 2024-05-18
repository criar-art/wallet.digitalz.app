import { Dropdown } from "react-native-element-dropdown";
import { useColorScheme } from "nativewind";
import { Props } from "./types";

export default function Select(props: Props) {
  const { colorScheme } = useColorScheme();

  return (
    <Dropdown
      testID="select-container"
      style={{
        paddingHorizontal: 12,
        paddingVertical: 8.4,
        borderRadius: 8,
        backgroundColor: `${
          colorScheme === "dark" ? "rgb(39 39 42)" : "white"
        }`,
        borderColor: props.error
          ? "rgb(239 68 68)"
          : `${colorScheme === "dark" ? "rgb(113 113 122)" : "rgb(71 85 105)"}`,
        borderWidth: 2,
      }}
      selectedTextStyle={{
        color: `${colorScheme === "dark" ? "white" : "black"}`,
      }}
      placeholderStyle={{
        fontSize: 17,
        color: `${colorScheme === "dark" ? "white" : "black"}`,
      }}
      iconStyle={{
        tintColor: props.error
          ? "rgb(239 68 68)"
          : `${colorScheme === "dark" ? "rgb(113 113 122)" : "rgb(71 85 105)"}`,
        transform: "scale(1.5)",
      }}
      containerStyle={{
        paddingVertical: 2.5,
        borderRadius: 8,
        borderColor: "#aaa",
        borderWidth: 1,
        backgroundColor: `${
          colorScheme === "dark" ? "rgb(113 113 122)" : "white"
        }`,
      }}
      itemContainerStyle={{
        borderRadius: 6,
        marginHorizontal: 5,
        marginVertical: 2.5,
        backgroundColor: `${colorScheme === "dark" ? "rgb(63 63 70)" : "#eee"}`,
        padding: 0,
        height: 45,
      }}
      itemTextStyle={{
        height: 20,
        margin: 0,
        padding: 0,
        position: "relative",
        top: -5,
        color: `${colorScheme === "dark" ? "white" : "black"}`,
      }}
      activeColor={`${colorScheme === "dark" ? "rgb(39 39 42)" : "#dcfce7"}`}
      data={props.data}
      maxHeight={props.maxHeight}
      labelField="label"
      valueField="value"
      placeholder={props.placeholder}
      value={props.value}
      onChange={({ value }) =>
        props.handleChangeObject
          ? props.onChange(value, props.handleChangeObject)
          : props.onChange(value)
      }
    />
  );
}
