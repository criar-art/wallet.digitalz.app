import { Text, TouchableOpacity, View } from "react-native";
import { useColorScheme } from "nativewind";
import { Props } from "./types";

export default function NavigationButton({
  labelButton,
  isFocused,
  onPress,
  onLongPress,
  options,
  orientation,
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
      className={`flex flex-1 justify-center items-center py-5 border-gray-200 dark:border-zinc-900 border-l-2 ${
        !isFocused
          ? "bg-white dark:bg-zinc-800"
          : "bg-gray-100 dark:bg-zinc-700"
      } ${
        orientation === 4 || orientation === 3
          ? "border-t-2"
          : "border-y-2"
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
        <Text
          className={`scale-[.85] text-xs bg-black dark:bg-white font-bold text-white dark:text-black px-2 py-1 absolute rounded-full ${
            orientation === 4 || orientation === 3
              ? "-left-3 top-1/2 translate-y-2"
              : "-top-3"
          }`}
        >
          {options.tabBarBadge}
        </Text>
      )}
    </TouchableOpacity>
  );
}
