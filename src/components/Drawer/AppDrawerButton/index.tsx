import { View } from "react-native";
import { useColorScheme } from "nativewind";
import { Props } from "./types";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "../../Button";

export default function AppDrawerButton({
  testID,
  onPress,
  drawerOptions,
}: Props) {
  const { colorScheme } = useColorScheme();

  const buttonClassName = `justify-start mx-4 mb-4 p-4 border-2 border-gray-200 dark:border-zinc-800 rounded-full ${
    drawerOptions?.isFocused
      ? "bg-gray-200 dark:bg-zinc-800 py-3"
      : "bg-transparent py-4"
  }`;

  const iconClassName = `flex items-center ${
    drawerOptions?.isFocused ? "scale-125" : "scale-100"
  }`;

  const iconConfig = {
    color: colorScheme === "dark" ? "white" : "black",
    size: 28,
  };

  return (
    <Button
      testID={testID}
      accessibilityState={drawerOptions?.isFocused ? { selected: true } : {}}
      text={drawerOptions?.labelButton}
      label={`Navegar para ${drawerOptions?.labelButton}`}
      onPress={onPress}
      className={buttonClassName}
      textColor="text-black dark:text-white ml-5"
      icon={
        <View className={iconClassName}>
          {drawerOptions?.options.drawerIcon({
            ...iconConfig,
          })}
        </View>
      }
    >
      <MaterialIcons
        name={drawerOptions?.isFocused ? "noise-aware" : "navigate-next"}
        {...iconConfig}
        style={{ marginLeft: "auto" }}
      />
    </Button>
  );
}
