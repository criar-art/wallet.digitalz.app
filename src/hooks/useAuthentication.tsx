import { useEffect } from "react";
import { BackHandler, AppState } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setIsLogin } from "../store/userSlice";
import { setEyeStatus } from "../store/commonSlice";
import { RootState } from "../store";

const useAuthentication = (navigate: any) => {
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector((state: RootState) => state.userState.isLogin);

  const authenticate = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Use seu padrão.",
    });

    if (result.success) {
      console.log("Padrão correto. Autenticado!");
      dispatch(setIsLogin(true));

      if (navigate) {
        setTimeout(() => {
          navigate("Root");
        }, 1000);
      }
    } else {
      handleLogout();
      console.log("Padrão incorreto ou autenticação cancelada.");
    }
  };

  const cancelAuthentication = async () => {
    try {
      await LocalAuthentication.cancelAuthenticate();
      console.log("Autenticação cancelada.");
      handleLogout();
    } catch (error) {
      console.log("Erro ao cancelar autenticação:", error);
    }
  };

  const handleLogout = () => {
    dispatch(setIsLogin(false));
    dispatch(setEyeStatus(false));
  };

  useEffect(() => {
    authenticate();

    const handleAppStateChange = (nextAppState: any) => {
      if (nextAppState === "background") {
        cancelAuthentication();
        handleLogout();
      }
    };

    const appStateListener = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        cancelAuthentication();
        handleLogout();
        return false;
      }
    );

    return () => {
      appStateListener.remove();
      handleLogout();
      backHandler.remove();
    };
  }, []);

  return { isLogin, cancelAuthentication, authenticate };
};

export default useAuthentication;
