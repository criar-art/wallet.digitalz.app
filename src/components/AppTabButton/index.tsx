import { Text, TouchableOpacity, View } from "react-native";
import { Props } from "./types";

export default function NavigationButton({
  labelButton,
  isFocused,
  onPress,
  onLongPress,
  options,
}: Props) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      onPress={onPress}
      onLongPress={onLongPress}
      className="flex flex-1 items-center py-5 border-y-2 border-l-2 border-gray-200"
      style={{ backgroundColor: !isFocused ? "white" : "#eee" }}
      disabled={isFocused}
    >
      <View
        className={`flex items-center ${
          !isFocused ? "scale-100" : "scale-125"
        }`}
      >
        {<options.tabBarIcon size={28} color="black" />}
      </View>
      <Text className="text-black text-xs">{labelButton}</Text>
      {!!options.tabBarBadge && (
        <Text className="scale-[.85] text-xs bg-black font-bold text-white px-2 py-1 absolute -top-3 rounded-full">
          {options.tabBarBadge}
        </Text>
      )}
    </TouchableOpacity>
  );
}
