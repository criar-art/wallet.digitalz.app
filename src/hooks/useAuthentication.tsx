import { useEffect, useState, useCallback } from "react";
import { BackHandler, AppState } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setIsLogin, setIsProtected } from "../store/userSlice";
import { setEyeStatus } from "../store/commonSlice";
import { setModalInfo } from "../store/modalsSlice";
import { RootState } from "../store";

const useAuthentication = (navigate?: any) => {
  const dispatch = useAppDispatch();
  const { isLogin, isProtected } = useAppSelector(
    (state: RootState) => state.userState
  );
  const [isSupported, setIsSupported] = useState<boolean | null>(null);
  const [isEnrolled, setIsEnrolled] = useState<boolean | null>(null);

  const protection = useCallback(async () => {
    dispatch(setIsProtected(true));
    handleLogout();
  }, [dispatch]);

  const protectionInformation = useCallback(
    (shouldShow: boolean = false) => {
      dispatch(setModalInfo(shouldShow ? "loginSupported" : ""));
    },
    [dispatch]
  );

  const checkLocalAuth = useCallback(async () => {
    const supported = await LocalAuthentication.hasHardwareAsync();
    setIsSupported(supported);

    const enrolled = await LocalAuthentication.isEnrolledAsync();
    setIsEnrolled(enrolled);

    protectionInformation(!supported || !enrolled || !isProtected);
  }, [isProtected, protectionInformation]);

  const authenticate = useCallback(async () => {
    await checkLocalAuth();

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
      handleLogout();
      console.log("Padrão incorreto ou autenticação cancelada.");
    }
  }, [checkLocalAuth, dispatch, navigate, protectionInformation]);

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
  }, [cancelAuthentication, dispatch]);

  useEffect(() => {
    if (isProtected) {
      authenticate();
    } else {
      checkLocalAuth();
      dispatch(setIsLogin(true));
      return;
    }

    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === "background") {
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
        handleLogout();
        return false;
      }
    );

    return () => {
      appStateListener.remove();
      handleLogout();
      backHandler.remove();
    };
  }, [isProtected, authenticate, checkLocalAuth, dispatch, handleLogout]);

  return {
    isLogin,
    isProtected,
    authenticate,
    protection,
    protectionInformation,
    isSupported,
    isEnrolled,
    handleLogout,
  };
};

export default useAuthentication;
