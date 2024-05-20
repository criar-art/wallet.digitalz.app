import { View } from "react-native";
import { useColorScheme } from "nativewind";
import { Props } from "./types";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import Button from "../Button";

export default function AppDrawerButton({ onPress, drawerOptions }: Props) {
  const { colorScheme } = useColorScheme();

  return (
    <Button
      accessibilityState={drawerOptions.isFocused ? { selected: true } : {}}
      text={drawerOptions.labelButton}
      label={`Navegar para ${drawerOptions.labelButton}`}
      onPress={onPress}
      className={`justify-start mx-4 mb-4 p-4 border-2 border-gray-200 dark:border-zinc-800 rounded-full ${
        drawerOptions.isFocused
          ? "bg-gray-200 dark:bg-zinc-800"
          : "bg-transparent"
      } ${
        drawerOptions.orientation === 4 || drawerOptions.orientation === 3
          ? "py-3"
          : "py-4"
      }`}
      textColor="text-black dark:text-white ml-5"
      icon={
        <View
          className={`flex items-center${
            !drawerOptions.isFocused ? "scale-100" : "scale-125"
          }`}
        >
          {
            <drawerOptions.options.drawerIcon
              size={28}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          }
        </View>
      }
    >
      {!drawerOptions.isFocused ? (
        <MaterialIcons
          name="navigate-next"
          size={28}
          color={colorScheme === "dark" ? "white" : "black"}
          style={{ marginLeft: "auto" }}
        />
      ) : (
        <MaterialCommunityIcons
          name="star-four-points-outline"
          size={20}
          color={colorScheme === "dark" ? "white" : "black"}
          style={{ marginLeft: "auto" }}
        />
      )}
    </Button>
  );
}
