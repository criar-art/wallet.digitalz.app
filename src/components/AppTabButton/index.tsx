import { Text, TouchableOpacity, View } from "react-native";
import { useColorScheme } from "nativewind";
import { Props } from "./types";

export default function NavigationButton({
  labelButton,
  isFocused,
  onPress,
  onLongPress,
  options,
}: Props) {
  const { colorScheme } = useColorScheme();

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      onPress={onPress}
      onLongPress={onLongPress}
      className={`flex flex-1 items-center py-5 border-y-2 border-l-2 border-gray-200 dark:border-zinc-900 ${
        !isFocused
          ? "bg-white dark:bg-zinc-800"
          : "bg-gray-100 dark:bg-zinc-700"
      }`}
      disabled={isFocused}
    >
      <View
        className={`flex items-center ${
          !isFocused ? "scale-100" : "scale-125"
        }`}
      >
        {
          <options.tabBarIcon
            size={28}
            color={colorScheme === "dark" ? "white" : "black"}
          />
        }
      </View>
      <Text className="text-black dark:text-white text-xs">{labelButton}</Text>
      {!!options.tabBarBadge && (
        <Text className="scale-[.85] text-xs bg-black dark:bg-white font-bold text-white dark:text-black px-2 py-1 absolute -top-3 rounded-full">
          {options.tabBarBadge}
        </Text>
      )}
    </TouchableOpacity>
  );
}
