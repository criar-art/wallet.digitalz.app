import { View, Text, Animated } from "react-native";
import useAuthentication from "@hooks/useAuthentication";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useEffect } from "react";
import { format } from "date-fns";

// @todo verificar porque não esta trazendo style
// import Button from "@components/Button";
import Button from "../../components/common/Button";
import useOrientation from "@hooks/useOrientation";

const LoginScreen = ({ navigation }: any) => {
  const { landscape } = useOrientation();
  const auth = useAuthentication(navigation.navigate);
  const translateX = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: -200,
          duration: 5000,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: 0,
          duration: 5000,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: 200,
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
  }, [auth.isLogin]);

  return (
    <View className="flex flex-1 flex-col justify-center items-center">
      <Animated.Image
        resizeMode="cover"
        style={{
          height: "100%",
          width: "200%",
          transform: [{ translateX: translateX }],
        }}
        source={require("../../images/world-login.webp")}
      />
      <BlurView
        intensity={100}
        tint="dark"
        style={{
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
        <View className="flex flex-col">
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
                className="p-4 px-6 my-2 rounded-full bg-zinc-900 border-white/10 border-2"
                textColor="text-lg text-white"
                text="Ínicio"
                label="Ir para o ínicio"
                onPress={() => navigation.navigate("Root")}
                icon={<MaterialIcons name="home" size={25} color="#fff" />}
              />
            )}
            {!auth.isLogin && (
              <Button
                className={`p-4 px-6 rounded-full bg-green-600 border-white/10 border-2 ${
                  !auth.isProtected && "m-2"
                }`}
                textColor="text-lg text-white"
                text={auth.isProtected ? "Entrar" : "Proteção"}
                label={auth.isProtected ? "Faça login" : "Faça proteção"}
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
                  className={`p-4 px-6 rounded-full bg-green-600 border-white/10 border-2 my-2 ${
                    landscape ? "mx-2 " : ""
                  }`}
                  textColor="text-lg text-white"
                  text="Proteção"
                  label="Mostrar informações de proteção"
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
                    className={`p-4 px-6 rounded-full bg-red-600 border-white/10 border-2 my-2 ${
                      landscape ? "my-2" : ""
                    }`}
                    textColor="text-lg text-white"
                    text="Sair"
                    label="Faça logout"
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
