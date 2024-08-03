import { View } from "react-native";
import { useColorScheme } from "nativewind";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "@components/common/Button";
import useOrientation from "@hooks/useOrientation";
import { Props } from "./types";

export default function AppDrawerButton({
  testID,
  onPress,
  drawerOptions,
}: Props) {
  const { colorScheme } = useColorScheme();
  const { landscape } = useOrientation();

  const buttonClassName = `justify-start mx-4 mb-1 border-2 border-gray-200 dark:border-zinc-800 rounded-full ${
    drawerOptions?.isFocused ? "bg-gray-200 dark:bg-zinc-800" : "bg-transparent"
  } ${landscape ? "pl-4 py-2" : "p-4"}`;

  const iconClassName = `flex items-center ${
    drawerOptions?.isFocused ? "scale-125" : "scale-100"
  }`;

  const iconConfig = {
    color: colorScheme === "dark" ? "white" : "black",
    size: 22,
  };

  return (
    <Button
      testID={testID}
      accessibilityState={drawerOptions?.isFocused ? { selected: true } : {}}
      text={drawerOptions?.labelButton}
      label={`Navegar para ${drawerOptions?.labelButton}`}
      onPress={onPress}
      twClass={buttonClassName}
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
