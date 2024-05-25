import { useLayoutEffect, useState } from "react";
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
import store from "@store";
import Routes from "@routes";
import ModalGlobal from "@modals";
import useAuthentication from "@hooks/useAuthentication";

function App(props: any) {
  const { colorScheme } = useColorScheme();
  useAuthentication(props.navigationRef.navigate);

  function toggleDrawer() {
    if (props.navigationRef.isReady()) {
      props.navigationRef.dispatch(DrawerActions.toggleDrawer());
    }
  }

  return (
    <>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <Routes
        toggleDrawer={toggleDrawer}
        dashboard={props.dashboard}
        name={props.name}
      />
      {!props.dashboard && <ModalGlobal />}
    </>
  );
}

function AppContainer() {
  const persistor = persistStore(store);
  const navigationRef = useNavigationContainerRef();
  const { colorScheme } = useColorScheme();
  const [dashboard, setDashboard] = useState<boolean>(false);
  const [currentRouteName, setCurrentRouteName] = useState<string>();

  const walletTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colorScheme === "dark" ? "rgb(24 24 27)" : "#efefef",
    },
  };

  function checkRoute() {
    if (navigationRef.isReady()) {
      const currentRoute = navigationRef.getCurrentRoute();
      setDashboard(
        currentRoute?.name == "About" || currentRoute?.name == "Contact"
      );
      setCurrentRouteName(currentRoute?.name);
    }
  }

  return (
    <SafeAreaProvider testID="app-container">
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer
            ref={navigationRef}
            onStateChange={() => checkRoute()}
            onReady={() => checkRoute()}
            theme={walletTheme}
          >
            <App
              navigation={navigationRef}
              dashboard={dashboard}
              navigationRef={navigationRef}
              name={currentRouteName}
            />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}

export default AppContainer;
