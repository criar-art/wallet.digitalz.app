import { useEffect, useCallback } from "react";
import { BackHandler, AppState } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setIsLogin, setIsProtected } from "@store/userSlice";
import { setEyeStatus } from "@store/commonSlice";
import { setModalInfo, setCloseAllModals } from "@store/modalsSlice";
import { RootState } from "@store";

const useAuthentication = (navigate?: any) => {
  const dispatch = useAppDispatch();
  const { isLogin, isProtected } = useAppSelector(
    (state: RootState) => state.userState
  );

  const protection = useCallback(async () => {
    dispatch(setIsProtected(true));
    handleLogout();
  }, [isProtected, isLogin]);

  const protectionInformation = useCallback(
    (shouldShow: boolean = false) => {
      dispatch(setModalInfo(shouldShow ? "loginSupported" : ""));
    },
    [isProtected, isLogin]
  );

  const checkLocalAuth = useCallback(async () => {
    const supported = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();

    if (!isLogin) {
      protectionInformation(!supported || !enrolled || !isProtected);
    }
  }, [isProtected, isLogin, protectionInformation]);

  const authenticate = useCallback(async () => {
    if (isProtected) {
      await checkLocalAuth();
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Use seu padrão.",
    });

    if (result.success) {
      console.log("Padrão correto. Autenticado!");
      protectionInformation(false);
      dispatch(setIsLogin(true));

      if (navigate) {
        setTimeout(() => {
          navigate("Root");
        }, 1000);
      }
    } else {
      // handleLogout();
      console.log("Padrão incorreto ou autenticação cancelada.");
    }
  }, [isProtected, protectionInformation, checkLocalAuth]);

  const cancelAuthentication = useCallback(async () => {
    try {
      await LocalAuthentication.cancelAuthenticate();
      console.log("Autenticação cancelada.");
    } catch (error) {
      console.log("Erro ao cancelar autenticação:", error);
    }
  }, []);

  const handleLogout = useCallback(() => {
    cancelAuthentication();
    dispatch(setIsLogin(false));
    dispatch(setEyeStatus(false));
    dispatch(setCloseAllModals());
  }, [isLogin, isProtected]);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === "background") {
        if (isProtected) {
          handleLogout();
        }
      }
    };

    const appStateListener = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (isProtected) {
          handleLogout();
        }
        return false;
      }
    );

    return () => {
      appStateListener.remove();
      backHandler.remove();
    };
  }, [isProtected, isLogin]);

  return {
    isLogin,
    isProtected,
    authenticate,
    protection,
    protectionInformation,
    handleLogout,
  };
};

export default useAuthentication;
