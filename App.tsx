import { StatusBar } from "expo-status-bar";
import {
  DrawerActions,
  NavigationContainer,
  useNavigationContainerRef,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { useColorScheme } from "nativewind";
import store from "@store";
import Routes from "@routes";
import ModalGlobal from "@modals";
import useAuthentication from "@hooks/useAuthentication";
import "./src/i18n";

const walletTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#efefef",
  },
};

const walletThemeDark = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "rgb(24 24 27)",
  },
};

function App() {
  const { colorScheme } = useColorScheme();
  const navigationRef = useNavigationContainerRef();
  useAuthentication(navigationRef.navigate);

  function toggleDrawer() {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(DrawerActions.toggleDrawer());
    }
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? walletThemeDark : walletTheme}
    >
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <Routes toggleDrawer={toggleDrawer} />
      <ModalGlobal />
    </NavigationContainer>
  );
}

function AppContainer() {
  const persistor = persistStore(store);

  return (
    <SafeAreaProvider testID="app-container">
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}

export default AppContainer;
