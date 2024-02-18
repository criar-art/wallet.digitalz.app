import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { DrawerItem, createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-gesture-handler";

import HomeScreen from "./src/views/HomeScreen";
import AboutScreen from "./src/views/AboutScreen";
import ContactScreen from "./src/views/ContactScreen";

const Drawer = createDrawerNavigator();

const views = [
  {
    name: "Home",
    title: "Wallet Digitalz",
    drawerLabel: "Início",
    drawerIcon: () => <MaterialIcons name="home" size={22} color="black" />,
    component: HomeScreen,
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

export default function App() {
  return (
    <SafeAreaProvider testID="app-container">
      <NavigationContainer>
        <StatusBar style="auto" />
        <Drawer.Navigator>
          {views.map(({ name, title, drawerIcon, drawerLabel, component }) => (
            <Drawer.Screen
              key={name}
              name={name}
              options={{
                title,
                drawerLabel,
                drawerIcon,
              }}
              component={component}
            />
          ))}
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
