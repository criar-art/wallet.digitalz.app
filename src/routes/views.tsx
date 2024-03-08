import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialIcons } from "@expo/vector-icons";

import { HomeStack } from "./viewsTab";
import AboutScreen from "../views/AboutScreen";
import ContactScreen from "../views/ContactScreen";

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

export default function Routes() {
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
          }}
          component={component}
        />
      ))}
    </Drawer.Navigator>
  );
}
