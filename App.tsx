import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  DrawerActions,
  NavigationContainer,
  useNavigationContainerRef,
  DefaultTheme,
} from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { useColorScheme } from "nativewind";
import store from "./src/store";
import Routes from "./src/routes";
import ModalGlobal from "./src/modals";

export default function App() {
  const persistor = persistStore(store);
  const navigationRef = useNavigationContainerRef();
  const [dashboard, setDashboard] = useState<boolean>(false);
  const [currentRouteName, setCurrentRouteName] = useState<string>();
  const { colorScheme } = useColorScheme();

  function toggleDrawer() {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(DrawerActions.toggleDrawer());
    }
  }

  function checkRoute() {
    if (navigationRef.isReady()) {
      const currentRoute = navigationRef.getCurrentRoute();
      setDashboard(
        currentRoute?.name == "About" || currentRoute?.name == "Contact"
      );
      setCurrentRouteName(currentRoute?.name);
    }
  }

  useEffect(() => {
    checkRoute();
  }, []);

  const walletTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colorScheme === "dark" ? "rgb(24 24 27)" : "#eee",
    },
  };

  return (
    <SafeAreaProvider testID="app-container">
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer
            ref={navigationRef}
            onStateChange={() => checkRoute()}
            theme={walletTheme}
          >
            <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
            <Routes
              toggleDrawer={toggleDrawer}
              dashboard={dashboard}
              navigation={navigationRef}
              name={currentRouteName}
            />
            {!dashboard && <ModalGlobal />}
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}
