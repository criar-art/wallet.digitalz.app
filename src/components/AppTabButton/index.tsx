import { Text, Pressable, View } from "react-native";
import { useColorScheme } from "nativewind";
import { Props } from "./types";

export default function NavigationButton({
  className,
  labelButton,
  isFocused,
  onPress,
  onLongPress,
  options,
  orientation,
}: Props) {
  const { colorScheme } = useColorScheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      onPress={onPress}
      onLongPress={onLongPress}
      className={`flex flex-1 justify-center items-center py-2 border-gray-200 dark:border-zinc-900 border-l-2 ${
        !isFocused
          ? "bg-white dark:bg-zinc-800"
          : "bg-gray-100 dark:bg-zinc-700"
      } ${
        orientation === 4 || orientation === 3 ? "border-t-2" : "border-y-2"
      } ${className}`}
      disabled={isFocused}
    >
      <View
        className={`flex items-center ${
          !isFocused ? "scale-100" : "scale-125"
        }`}
      >
        {
          <options.tabBarIcon
            size={25}
            color={colorScheme === "dark" ? "white" : "black"}
          />
        }
      </View>
      <Text className="text-black dark:text-white text-xs">{labelButton}</Text>
      {!!options.tabBarBadge && (
        <Text
          className={`scale-[.85] text-xs bg-black dark:bg-white font-bold text-white dark:text-black px-2 py-1 absolute rounded-full -top-3`}
        >
          {options.tabBarBadge}
        </Text>
      )}
    </Pressable>
  );
}
