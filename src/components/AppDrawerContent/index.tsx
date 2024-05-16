import { Text, View, Platform } from "react-native";
import pkg from "../../../package.json";
import app from "../../../app.json";
import Button from "../Button";
import { Props } from "./types";

export default function AppDrawerContent({
  state,
  descriptors,
  navigation,
}: Props) {
  const appVersion = pkg.version;
  const versionCode = app.expo.android.versionCode;

  return (
    <View testID="app-drawer-content" className="flex flex-row w-full h-full">
      <View className="pt-12 w-full">
        {state?.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const labelButton = label == "Wallet Digitalz" ? "Ínicio" : label;
          const isFocused = state.index === index;

          const onPress = () => {
            if (!isFocused) {
              navigation.navigate(route.name, route.params);
            } else {
              navigation.closeDrawer();
            }
          };

          return (
            <Button
              key={index}
              accessibilityState={isFocused ? { selected: true } : {}}
              text={labelButton}
              label={`Navegar para ${labelButton}`}
              onPress={onPress}
              className={`justify-start py-7 ml-2 pl-6 bg-transparent rounded-none ${
                !!isFocused && "bg-gray-200 rounded-tl-full rounded-bl-full"
              }`}
              textColor="black"
              icon={
                <View
                  className={`flex items-center mr-4 ${
                    !isFocused ? "scale-100" : "scale-125"
                  }`}
                >
                  {<options.drawerIcon size={28} color="black" />}
                </View>
              }
            ></Button>
          );
        })}
        <View className="flex p-10 mt-auto">
          <Text className="text-center">
            Versão {appVersion}
            {Platform.OS === "android" && ` - Build ${versionCode}`}
          </Text>
        </View>
      </View>
    </View>
  );
}
