import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import useOrientation from "@hooks/useOrientation";
import { setModalRegister } from "@store/modalsSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import utils from "@utils";
import Button from "@components/common/Button";
import AppTabButton from "../AppTabButton";
import useIsTablet from "@hooks/useIsTablet";
import { RootState } from "@store";
import { Props, Route } from "./types";

export default function AppTabBar({ state, descriptors, navigation }: Props) {
  const { landscape } = useOrientation();
  const isTablet = useIsTablet();
  const dispatch = useAppDispatch();
  const common = useAppSelector((state: RootState) => state.commonState);
  const handleNewRegister = () => dispatch(setModalRegister("register"));
  const menuTranslateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (common.menuVisible) {
      Animated.timing(menuTranslateY, {
        toValue: 0, // Slide up out of view
        duration: 800,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(menuTranslateY, {
        toValue: 100, // Slide down into view
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [common.menuVisible]);

  return (
    <Animated.View
      testID="app-tab-bar"
      className={`absolute bottom-0 flex bg-transparent dark:bg-zinc-900 flex-row justify-center ${
        landscape ? "h-0 left-[50%]" : ""
      }`}
      style={[{ transform: [{ translateY: menuTranslateY }] }]}
    >
      <View
        className={`flex flex-row ${
          landscape || isTablet ? "w-[400] absolute bottom-0" : "w-full"
        }`}
      >
        <Button
          pressableButton
          label="Novo registro"
          textColor="text-white"
          twClass={`z-10 rounded-full absolute w-18 h-18 border-2 border-white dark:border-zinc-900 bg-green-600 bottom-[44] left-1/2 -translate-x-7 translate-y-2`}
          onPress={handleNewRegister}
          icon={<MaterialIcons name="add" size={35} color="white" />}
        />
        {state?.routes.map((route: Route, index: number) => {
          const { options } = descriptors[route.key];
          const labelButton: string = utils.getLabel(options, route);
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
              twClass={`${
                index == 0
                  ? "rounded-tl-3xl"
                  : state?.routes.length - 1 == index
                  ? "rounded-tr-3xl border-r-2"
                  : ""
              }`}
              key={index}
              labelButton={labelButton}
              name={route.name}
              isFocused={isFocused}
              onPress={onPress}
              onLongPress={onLongPress}
              options={options}
            />
          );
        })}
      </View>
    </Animated.View>
  );
}
