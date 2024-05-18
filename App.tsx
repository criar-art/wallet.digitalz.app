import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  DrawerActions,
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { useColorScheme } from "nativewind";
import store from "./src/store";
import Routes from "./src/routes";
import ModalRegister from "./src/components/ModalRegister";
import ModalAlert from "./src/components/ModalDelete";
import ModalInfo from "./src/components/ModalInfo";

export default function App() {
  const persistor = persistStore(store);
  const navigationRef = useNavigationContainerRef();
  const [dashboard, setDashboard] = useState(false);
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
    }
  }

  useEffect(() => {
    checkRoute();
  }, []);

  return (
    <SafeAreaProvider testID="app-container">
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer
            ref={navigationRef}
            onStateChange={() => checkRoute()}
          >
            <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
            <Routes
              toggleDrawer={toggleDrawer}
              dashboard={dashboard}
              navigation={navigationRef}
            />
            {!dashboard && (
              <>
                <ModalRegister />
                <ModalAlert />
                <ModalInfo />
              </>
            )}
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}
