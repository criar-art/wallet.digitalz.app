import { Text, View, Platform } from "react-native";
import { useColorScheme } from "nativewind";
import useOrientation from "../../hooks/useOrientation";
import pkg from "../../../package.json";
import app from "../../../app.json";
import Button from "../Button";
import { getLabel } from "../../utils";
import { Props, RenderButtonParams } from "./types";
import { MaterialIcons } from "@expo/vector-icons";

export default function AppDrawerContent({
  state,
  descriptors,
  navigation,
}: Props) {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const orientation = useOrientation();
  const appVersion = pkg.version;
  const versionCode =
    Platform.OS === "android" ? app.expo.android.versionCode : "";

  const onPress = (route: any, isFocused: boolean): void => {
    if (!isFocused) {
      navigation.navigate(route.name, route.params);
    } else {
      navigation.closeDrawer();
    }
  };

  const renderButton = ({
    route,
    index,
    isFocused,
    labelButton,
    options,
  }: RenderButtonParams): JSX.Element => (
    <Button
      key={index}
      accessibilityState={isFocused ? { selected: true } : {}}
      text={labelButton}
      label={`Navegar para ${labelButton}`}
      onPress={() => onPress(route, isFocused)}
      className={`justify-start ml-2 pl-6 ${
        isFocused
          ? "bg-gray-200 dark:bg-zinc-800 rounded-tl-full rounded-bl-full"
          : "bg-transparent rounded-none"
      } ${orientation === 4 || orientation === 3 ? "py-5" : "py-7"}`}
      textColor="text-black dark:text-white"
      icon={
        <View
          className={`flex items-center mr-4 ${
            !isFocused ? "scale-100" : "scale-125"
          }`}
        >
          {
            <options.drawerIcon
              size={28}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          }
        </View>
      }
    />
  );

  return (
    <View
      testID="app-drawer-content"
      className="dark:bg-zinc-900 flex flex-row w-full h-full"
    >
      <View className="pt-12 w-full">
        {state?.routes.map((route: any, index: number) => {
          const { options }: { options: any } = descriptors[route.key];
          const labelButton: string =
            getLabel(options, route) == "Wallet Digitalz"
              ? "Ínicio"
              : getLabel(options, route);
          const isFocused: boolean = state.index === index;

          return renderButton({
            route,
            index,
            isFocused,
            labelButton,
            options,
          });
        })}

        <View
          className={`flex mt-auto ${
            orientation === 4 || orientation === 3 ? "pb-5 px-10" : "p-10"
          }`}
        >
          <Button
            onPress={toggleColorScheme}
            className="bg-transparent border-2 border-gray-200 dark:border-zinc-700 my-4 rounded-full py-4"
            text="Darkmode"
            textColor="text-black dark:text-white"
            label="Toogle darkmode"
            icon={
              <MaterialIcons
                name={colorScheme === "dark" ? "dark-mode" : "light-mode"}
                size={22}
                color={colorScheme === "dark" ? "white" : "black"}
              />
            }
          />
          <Text className="text-center dark:text-white">
            Versão {appVersion}
            {versionCode && ` - Build ${versionCode}`}
          </Text>
        </View>
      </View>
    </View>
  );
}
