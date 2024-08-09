import { View, Text, Animated } from "react-native";
import useAuthentication from "@hooks/useAuthentication";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useEffect } from "react";
import { format } from "date-fns";
import Button from "@components/common/Button";
import useOrientation from "@hooks/useOrientation";
import { useColorScheme } from "nativewind";
import { useTranslation } from "react-i18next";

const LoginScreen = ({ navigation }: any) => {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const { landscape } = useOrientation();
  const auth = useAuthentication(navigation.navigate);
  const translateX = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: -100,
          duration: 5000,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: 0,
          duration: 5000,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: 100,
          duration: 5000,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: 0,
          duration: 5000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View className="flex flex-1 flex-col justify-center items-center">
      <Animated.Image
        resizeMode="cover"
        style={{
          height: "100%",
          width: "200%",
          transform: [{ translateX: translateX }],
        }}
        source={
          colorScheme == "dark"
            ? require("../../images/world-login.webp")
            : require("../../images/world-light.jpg")
        }
      />
      <BlurView
        intensity={100}
        tint="dark"
        style={{
          width: (!auth.isLogin && auth.isProtected) || landscape ? 'auto': '80%',
          justifyContent: "center",
          alignItems: "center",
          borderRadius: !auth.isLogin && auth.isProtected ? 100 : 20,
          borderColor: "rgba(255,255,255,.4)",
          borderWidth: 1,
          overflow: "hidden",
          padding: 20,
          paddingVertical: 20,
          margin: "auto",
          position: "absolute",
        }}
      >
        <View className="flex flex-col w-full">
          {(auth.isLogin || !auth.isProtected) && (
            <View
              className={`flex " ${
                landscape ? "flex-row justify-center items-center" : "flex-col"
              }`}
            >
              <Text
                className={`text-white font-black text-2xl text-center ${
                  landscape ? "mb-2" : "mb-10"
                }`}
              >
                Wallet Digitalz
              </Text>
              <Text
                className={`text-green-400 font-black text-3xl text-center mb-2  ${
                  landscape ? "ml-4" : "-mt-8"
                }`}
              >
                {format(new Date(), "yyyy")}
              </Text>
            </View>
          )}

          <View
            className={`flex flex-nowrap justify-center" ${
              landscape ? "flex-row" : "flex-col"
            }`}
          >
            {(!auth.isProtected || auth.isLogin) && (
              <Button
                twClass={`p-4 my-2 rounded-full bg-zinc-900 border-white/10 border-2 justify-between ${
                  !landscape && "flex-row-reverse"
                }`}
                textColor="text-lg text-white"
                text={t("routes.home")}
                label={t("login.goToHome")}
                onPress={() => navigation.navigate("Root")}
                icon={<MaterialIcons name="home" size={25} color="#fff" />}
              />
            )}
            {!auth.isLogin && (
              <Button
                twClass={`p-4 rounded-full bg-green-600 border-white/10 border-2 justify-between my-2 ${
                  !auth.isProtected && landscape && "ml-4"
                } ${
                  !landscape && !auth.isProtected && "flex-row-reverse"
                }`}
                textColor="text-lg text-white"
                text={
                  auth.isProtected
                    ? t("common.enter")
                    : t("modalContent.protection.switchLabel")
                }
                label={auth.isProtected ? t("login.enterLogin") : t("login.enableProtection")}
                onPress={() =>
                  auth.isProtected
                    ? auth.authenticate()
                    : auth.protectionInformation(true)
                }
                icon={
                  <MaterialIcons
                    name={auth.isProtected ? "fingerprint" : "lock"}
                    size={25}
                    color="#fff"
                  />
                }
              />
            )}
            {auth.isLogin && (
              <>
                <Button
                  twClass={`p-4 rounded-full bg-green-600 border-white/10 border-2 my-2 justify-between ${
                    landscape ? "mx-2" : "flex-row-reverse"
                  }`}
                  textColor="text-lg text-white"
                  text={t("modalContent.protection.switchLabel")}
                  label={t("login.enableProtection")}
                  onPress={() => auth.protectionInformation(true)}
                  icon={
                    <MaterialIcons
                      name={auth.isProtected ? "lock" : "lock-open"}
                      size={25}
                      color="#fff"
                    />
                  }
                />
                {auth.isProtected && (
                  <Button
                    twClass={`p-4 rounded-full bg-red-600 border-white/10 border-2 my-2 justify-between ${
                      landscape ? "my-2" : "flex-row-reverse"
                    }`}
                    textColor="text-lg text-white"
                    text={t("common.logout")}
                    label={t("login.logoutLabel")}
                    onPress={auth.handleLogout}
                    icon={
                      <MaterialIcons name="logout" size={25} color="#fff" />
                    }
                  />
                )}
              </>
            )}
          </View>
        </View>
      </BlurView>
    </View>
  );
};

export default LoginScreen;
