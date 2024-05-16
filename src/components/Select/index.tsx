import { Dropdown } from "react-native-element-dropdown";
import { Props } from "./types";

export default function Select(props: Props) {
  return (
    <Dropdown
      testID="select-container"
      style={{
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 8,
        borderColor: "rgb(71 85 105)",
        borderWidth: 2,
      }}
      placeholderStyle={{
        fontSize: 17
      }}
      iconStyle={{
        tintColor: "rgb(71 85 105)",
        transform: "scale(1.5)"
      }}
      containerStyle={{
        paddingVertical: 2.5,
        borderRadius: 8,
        borderColor: "#aaa",
        borderWidth: 1,
        backgroundColor: "#fff",
      }}
      itemContainerStyle={{
        borderRadius: 6,
        marginHorizontal: 5,
        marginVertical: 2.5,
        backgroundColor: "#eee",
        padding: 0,
        height: 45,
      }}
      itemTextStyle={{
        height: 20,
        margin: 0,
        padding: 0,
        position: "relative",
        top: -5,
      }}
      activeColor="#dcfce7"
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
