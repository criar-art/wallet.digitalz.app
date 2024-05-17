import { Text, View, Platform } from "react-native";
import pkg from "../../../package.json";
import app from "../../../app.json";
import Button from "../Button";
import { getLabel } from "../../utils";
import { Props, RenderButtonParams } from "./types";

export default function AppDrawerContent({
  state,
  descriptors,
  navigation,
}: Props) {
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
      className={`justify-start py-7 ml-2 pl-6 bg-transparent rounded-none ${
        isFocused ? "bg-gray-200 rounded-tl-full rounded-bl-full" : ""
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
    />
  );

  return (
    <View testID="app-drawer-content" className="flex flex-row w-full h-full">
      <View className="pt-12 w-full">
        {state?.routes.map((route: any, index: number) => {
          const { options }: { options: any } = descriptors[route.key];
          const labelButton: string = getLabel(options, route);
          const isFocused: boolean = state.index === index;

          return renderButton({
            route,
            index,
            isFocused,
            labelButton,
            options,
          });
        })}

        <View className="flex p-10 mt-auto">
          <Text className="text-center">
            Versão {appVersion}
            {versionCode && ` - Build ${versionCode}`}
          </Text>
        </View>
      </View>
    </View>
  );
}
