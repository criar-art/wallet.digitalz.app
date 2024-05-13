import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

import { HomeStack } from "./viewsTab";
import AboutScreen from "../views/AboutScreen";
import ContactScreen from "../views/ContactScreen";

import { useAppSelector, useAppDispatch } from "../store/hooks";
import { RootState } from "../store";
import { setEyeStatus } from "../store/commonSlice";

const Drawer = createDrawerNavigator();

export const views = [
  {
    name: "Root",
    title: "Wallet Digitalz",
    drawerLabel: "Início",
    drawerIcon: () => <MaterialIcons name="home" size={22} color="black" />,
    component: HomeStack,
  },
  {
    name: "About",
    title: "Sobre",
    drawerLabel: "Sobre",
    drawerIcon: () => <MaterialIcons name="info" size={22} color="black" />,
    component: AboutScreen,
  },
  {
    name: "Contact",
    title: "Contato",
    drawerLabel: "Contato",
    drawerIcon: () => <MaterialIcons name="email" size={22} color="black" />,
    component: ContactScreen,
  },
];

export default function Routes(props: any) {
  const dispatch = useAppDispatch();
  const common = useAppSelector((state: RootState) => state.commonState);

  function toggleEye() {
    dispatch(setEyeStatus(!common.eyeStatus));
  }

  return (
    <Drawer.Navigator initialRouteName="Root">
      {views.map(({ name, title, drawerIcon, drawerLabel, component }) => (
        <Drawer.Screen
          key={name}
          name={name}
          options={{
            title,
            drawerLabel,
            drawerIcon,
            drawerActiveTintColor: "#333",
            headerTitleAlign: "center",
            headerLeft: () => (
              <TouchableOpacity
                className="p-3"
                onPress={() => props.toggleDrawer()}
              >
                <MaterialIcons name="menu" size={22} color="black" />
              </TouchableOpacity>
            ),
            headerRight: () =>
              !props.dashboard ? (
                <TouchableOpacity className="p-3" onPress={() => toggleEye()}>
                  {common.eyeStatus ? (
                    <Ionicons name="eye" size={22} color="black" />
                  ) : (
                    <Ionicons name="eye-off" size={22} color="black" />
                  )}
                </TouchableOpacity>
              ) : null,
          }}
          component={component}
        />
      ))}
    </Drawer.Navigator>
  );
}
