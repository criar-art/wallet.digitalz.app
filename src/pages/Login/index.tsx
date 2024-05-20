import { View, Text, Image, Animated } from "react-native";
import useAuthentication from "../../hooks/useAuthentication";
import Button from "../../components/Button";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useEffect } from "react";
import { format } from "date-fns";

const LoginScreen = ({ navigation }: any) => {
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
        source={require("../../images/world.webp")}
      />
      <BlurView
        intensity={100}
        tint="dark"
        style={{
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 30,
          borderColor: "rgba(255,255,255,.4)",
          borderWidth: 1,
          overflow: "hidden",
          padding: 40,
          paddingVertical: 40,
          margin: "auto",
          position: "absolute",
        }}
      >
        <View className="flex">
          {auth.isLogin && (
            <>
              <Text className="text-white font-black text-2xl text-center mb-10">
                Wallet Digitalz
              </Text>
              <Text className="text-green-400 font-black text-3xl text-center mb-10 -mt-8">
                {format(new Date(), "yyyy")}
              </Text>
            </>
          )}

          <View className="flex flex-row justify-center">
            <Button
              className={`mx-auto p-4 px-6 rounded-full border-white/10 border-2 ${
                auth.isLogin ? "bg-red-600 mr-2" : "bg-green-600"
              }`}
              textColor="text-lg text-white"
              text={auth.isLogin ? "Sair" : "Entrar"}
              label={auth.isLogin ? "Faça logout" : "Faça login"}
              onPress={
                !auth.isLogin ? auth.authenticate : auth.cancelAuthentication
              }
              icon={
                <MaterialIcons
                  name={auth.isLogin ? "logout" : "fingerprint"}
                  size={25}
                  color="#fff"
                />
              }
            />
            {auth.isLogin && (
              <Button
                className={`mx-auto p-4 px-6 ml-2 rounded-full bg-zinc-900 border-white/10 border-2`}
                textColor="text-lg text-white"
                text="Ínicio"
                label="Ir para o ínicio"
                onPress={() => navigation.navigate("Root")}
                icon={<MaterialIcons name="home" size={25} color="#fff" />}
              />
            )}
          </View>
        </View>
      </BlurView>
    </View>
  );
};

export default LoginScreen;
