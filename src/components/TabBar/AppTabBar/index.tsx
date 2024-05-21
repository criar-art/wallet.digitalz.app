import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import useOrientation from "@hooks/useOrientation";
import { setModalRegister } from "@store/modalsSlice";
import { useAppDispatch } from "@store/hooks";
import { getLabel } from "@utils";
import AppTabButton from "@components/TabBar/AppTabButton";
import { Props, Route } from "./types";

// @todo verificar porque não esta trazendo style
// import Button from "@components/Button";
import Button from "../../Button";

export default function AppTabBar({ state, descriptors, navigation }: Props) {
  const { landscape } = useOrientation();
  const dispatch = useAppDispatch();
  const handleNewRegister = () => dispatch(setModalRegister("register"));

  return (
    <View
      testID="app-tab-bar"
      className={`flex bg-transparent dark:bg-zinc-900 flex-row justify-center ${
        landscape ? "h-0" : ""
      }`}
    >
      <View
        className={`flex flex-row ${
          landscape ? "w-[400] absolute bottom-0" : "w-full"
        }`}
      >
        <Button
          pressableButton
          label="Novo registro"
          textColor="text-white"
          className={`z-10 rounded-full absolute w-18 h-18 border-2 border-white dark:border-zinc-900 bg-green-600 bottom-[30] left-1/2 -translate-x-7`}
          onPress={handleNewRegister}
          icon={<MaterialIcons name="add" size={35} color="white" />}
        />
        {state?.routes.map((route: Route, index: number) => {
          const { options } = descriptors[route.key];
          const labelButton: string = getLabel(options, route);
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <AppTabButton
              className={`${
                index == 0
                  ? "rounded-tl-3xl"
                  : state?.routes.length - 1 == index
                  ? "rounded-tr-3xl"
                  : ""
              }`}
              key={index}
              labelButton={labelButton}
              isFocused={isFocused}
              onPress={onPress}
              onLongPress={onLongPress}
              options={options}
            />
          );
        })}
      </View>
    </View>
  );
}
