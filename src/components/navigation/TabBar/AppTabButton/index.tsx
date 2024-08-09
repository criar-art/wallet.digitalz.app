import { Text, Pressable, View } from "react-native";
import { useColorScheme } from "nativewind";
import utils from "@utils";
import { Props } from "./types";

export default function AppTabButton({
  twClass,
  name,
  labelButton,
  isFocused,
  onPress,
  onLongPress,
  options,
}: Props) {
  const { colorScheme } = useColorScheme();

  if(!options.tabBarIcon) {
    return;
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      onPress={onPress}
      onLongPress={onLongPress}
      className={`flex flex-1 bg-white dark:bg-zinc-800 justify-center items-center pt-2 px-2 pb-1 border-gray-200 dark:border-zinc-900 border-l-2 border-t-2 ${twClass}`}
      disabled={isFocused}
    >
      <View className="flex items-center">
        {
          <options.tabBarIcon
            size={25}
            color={colorScheme === "dark" ? "white" : "black"}
          />
        }
      </View>
      <Text className="text-black dark:text-white text-xs">{labelButton}</Text>
      {!!options.tabBarBadge && (
        <View className={`scale-[.85] text-xs bg-black dark:bg-white font-bold text-white dark:text-black px-2 py-1 absolute rounded-full -top-3`}>
          <Text className="text-xsfont-bold text-white dark:text-black">
            {options.tabBarBadge}
          </Text>
        </View>
      )}
      <View
        className="mt-1 h-2 w-full rounded-full"
        style={
          isFocused && {
            backgroundColor: utils.renderColorType(
              name.toLocaleLowerCase(),
              colorScheme
            ),
          }
        }
      />
    </Pressable>
  );
}
