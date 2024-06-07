import { StatusBar } from "expo-status-bar";
import {
  DrawerActions,
  NavigationContainer,
  useNavigationContainerRef,
  DefaultTheme,
} from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-gesture-handler";
import analytics from "@react-native-firebase/analytics";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { useColorScheme } from "nativewind";
import store from "@store";
import Routes from "@routes";
import ModalGlobal from "@modals";
import useAuthentication from "@hooks/useAuthentication";

async function App(props: any) {
  const { colorScheme } = useColorScheme();
  useAuthentication(props.navigationRef.navigate);

  const appInstanceId = await analytics().getAppInstanceId();
  console.info("appInstanceId: ", appInstanceId);

  function toggleDrawer() {
    if (props.navigationRef.isReady()) {
      props.navigationRef.dispatch(DrawerActions.toggleDrawer());
    }
  }

  return (
    <>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <Routes toggleDrawer={toggleDrawer} />
      <ModalGlobal />
    </>
  );
}

function AppContainer() {
  const persistor = persistStore(store);
  const navigationRef = useNavigationContainerRef();
  const { colorScheme } = useColorScheme();

  const walletTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colorScheme === "dark" ? "rgb(24 24 27)" : "#efefef",
    },
  };

  return (
    <SafeAreaProvider testID="app-container">
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer ref={navigationRef} theme={walletTheme}>
            <App navigationRef={navigationRef} />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}

export default AppContainer;
