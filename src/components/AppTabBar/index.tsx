import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import useOrientation from "../../hooks/useOrientation";
import { setModalRegister } from "../../store/commonSlice";
import { useAppDispatch } from "../../store/hooks";
import Button from "../../components/Button";
import { getLabel } from "../../utils";
import { Props, Route } from "./types";
import AppTabButton from "../AppTabButton";

export default function AppTabBar({ state, descriptors, navigation }: Props) {
  const orientation = useOrientation();
  const dispatch = useAppDispatch();
  const handleNewRegister = () => dispatch(setModalRegister("register"));

  return (
    <View
      testID="app-tab-bar"
      className={`flex bg-white dark:bg-zinc-900 ${
        orientation === 4 || orientation === 3
          ? "flex-col flex-nowrap h-full w-[90] absolute right-0"
          : "flex-row"
      }`}
    >
      <Button
        pressableButton
        label="Novo registro"
        textColor="text-white"
        className={`z-10 rounded-full absolute w-18 h-18 border-2 border-white dark:border-zinc-900 bg-green-600 ${
          orientation === 4 || orientation === 3
            ? "left-0 top-1/2 -translate-y-7 -translate-x-7"
            : "bottom-[60] left-1/2 -translate-x-7"
        }`}
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
            key={index}
            labelButton={labelButton}
            isFocused={isFocused}
            onPress={onPress}
            onLongPress={onLongPress}
            options={options}
            orientation={orientation}
          />
        );
      })}
    </View>
  );
}
