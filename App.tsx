import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-gesture-handler";

import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import store from "./src/store";

import HomeScreen from "./src/views/HomeScreen";
import ExpenseScreen from "./src/views/ExpenseScreen";
import EntryScreen from "./src/views/EntryScreen";
import InvestimentScreen from "./src/views/InvestimentScreen";
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
    name: "Expense",
    title: "Despesa",
    drawerLabel: "Despesa",
    drawerIcon: () => <MaterialIcons name="info" size={22} color="black" />,
    component: ExpenseScreen,
  },
  {
    name: "Entry",
    title: "Entrada",
    drawerLabel: "Entrada",
    drawerIcon: () => <MaterialIcons name="info" size={22} color="black" />,
    component: EntryScreen,
  },
  {
    name: "Investiment",
    title: "Investimento",
    drawerLabel: "Investimento",
    drawerIcon: () => <MaterialIcons name="info" size={22} color="black" />,
    component: InvestimentScreen,
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
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider testID="app-container">
          <NavigationContainer>
            <StatusBar style="auto" />
            <Drawer.Navigator>
              {views.map(
                ({ name, title, drawerIcon, drawerLabel, component }) => (
                  <Drawer.Screen
                    key={name}
                    name={name}
                    options={{
                      title,
                      drawerLabel,
                      drawerIcon,
                      drawerActiveTintColor: '#333'
                    }}
                    component={component}
                  />
                )
              )}
            </Drawer.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
