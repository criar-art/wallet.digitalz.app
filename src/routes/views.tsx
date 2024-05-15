import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialIcons, Ionicons, Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

import { HomeStack } from "./viewsTab";
import AboutScreen from "../views/AboutScreen";
import ContactScreen from "../views/ContactScreen";

import { useAppSelector, useAppDispatch } from "../store/hooks";
import { setEyeStatus } from "../store/commonSlice";
import { RootState } from "../store";

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
    drawerIcon: () => <Entypo name="info" size={22} color="black" />,
    component: AboutScreen,
  },
  {
    name: "Contact",
    title: "Contato",
    drawerLabel: "Contato",
    drawerIcon: () => <MaterialIcons name="call" size={22} color="black" />,
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
            drawerPosition: "right",
            drawerItemStyle: {
              padding: 5,
              borderTopStartRadius: 50,
              borderBottomStartRadius: 50,
            },
            drawerStyle: {
              borderTopStartRadius: 20,
              borderBottomStartRadius: 20,
            },
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerStyle: {
              height: 120,
            },
            headerRight: () => (
              <TouchableOpacity
                className="p-3 bg-gray-100 mr-4 rounded-full"
                onPress={() => props.toggleDrawer()}
                accessibilityLabel="Abrir menu drawer de páginas"
              >
                <MaterialIcons name="menu" size={32} color="black" />
              </TouchableOpacity>
            ),
            headerLeft: () =>
              !props.dashboard ? (
                <TouchableOpacity
                  className="p-4 bg-gray-100 ml-4 rounded-full"
                  onPress={() => toggleEye()}
                  accessibilityLabel={
                    common.eyeStatus ? "Ocultar valores" : "Mostrar valores"
                  }
                >
                  {common.eyeStatus ? (
                    <Ionicons name="eye" size={25} color="black" />
                  ) : (
                    <Ionicons name="eye-off" size={25} color="black" />
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
