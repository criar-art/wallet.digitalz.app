import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import store from "./src/store";
import Routes from "./src/routes/views";
import ModalRegister from "./src/components/ModalRegister";

export default function App() {
  const persistor = persistStore(store);
  const navigationRef = useNavigationContainerRef();
  const [modalRegister, setModalRegister] = useState(false);

  function checkRoute() {
    if (navigationRef.isReady()) {
      const currentRoute = navigationRef.getCurrentRoute();
      setModalRegister(
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
            <StatusBar style="auto" />
            <Routes />
            {!modalRegister && <ModalRegister />}
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}
