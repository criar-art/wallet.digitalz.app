import { Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "../../components/Button";
import { setModalRegister } from "../../store/commonSlice";
import { useAppDispatch } from "../../store/hooks";
import { Props } from "./types";

export default function AppTabBar({ state, descriptors, navigation }: Props) {
  const dispatch = useAppDispatch();

  return (
    <View className="flex flex-row" testID="app-tab-bar">
      <Button
        pressableButton
        label="Criar novo registro"
        textColor="text-white"
        className="z-10 rounded-full absolute bottom-[60] left-1/2 -translate-x-7 w-18 h-18 border-2 border-white bg-green-600"
        onPress={() => dispatch(setModalRegister("register"))}
        icon={<MaterialIcons name="add" size={35} color="white" />}
      />
      {state?.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

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
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            className="flex flex-1 items-center py-5 border-y-2 border-l-2 border-gray-200"
            style={{ backgroundColor: !isFocused ? "white" : "#eee" }}
          >
            <View
              className={`flex items-center ${
                !isFocused ? "scale-100" : "scale-125"
              }`}
            >
              {<options.tabBarIcon size={28} color="black" />}
            </View>
            <Text className="text-black text-xs">{label}</Text>
            {!!options.tabBarBadge && (
              <Text className="scale-[.85] text-xs bg-red-400 font-bold text-white px-2 py-1 absolute -top-3 rounded-full">
                {options.tabBarBadge}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
