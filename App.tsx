import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-gesture-handler";

import HomeScreen from "./src/views/HomeScreen";
import AboutScreen from "./src/views/AboutScreen";
import ContactScreen from "./src/views/ContactScreen";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <SafeAreaProvider testID="app-container">
      <NavigationContainer>
        <StatusBar style="auto" />
        <Drawer.Navigator>
          <Drawer.Screen
            name="Home"
            options={{ title: "Wallet Digitalz", drawerLabel: "Início" }}
            component={HomeScreen}
          />
          <Drawer.Screen
            name="About"
            options={{ title: "Sobre", drawerLabel: "Sobre" }}
            component={AboutScreen}
          />
          <Drawer.Screen
            name="Contact"
            options={{ title: "Contato", drawerLabel: "Contato" }}
            component={ContactScreen}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
