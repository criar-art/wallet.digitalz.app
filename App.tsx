import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
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

  return (
    <SafeAreaProvider testID="app-container">
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer>
            <StatusBar style="auto" />
            <Routes />
            <ModalRegister />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}
