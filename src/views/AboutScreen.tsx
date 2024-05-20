import React from "react";
import { Image, Text, View, ScrollView, Linking } from "react-native";
import { Fontisto, MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import useOrientation from "../hooks/useOrientation";
import FadeView from "../components/FadeView";
import Button from "../components/Button";

export default function AboutScreen() {
  const { colorScheme } = useColorScheme();
  const { landscape } = useOrientation();
  const iconConfig = {
    size: 28,
    color: colorScheme === "dark" ? "white" : "black",
  };

  const renderButton = (text: string, label: string, url: string) => (
    <Button
      text={text}
      label={label}
      textColor="text-lg text-black dark:text-white"
      onPress={() => Linking.openURL(url)}
      icon={<Fontisto name="world" {...iconConfig} />}
      className="justify-start mt-4 p-6 shadow-lg bg-white dark:bg-zinc-800"
    >
      <MaterialIcons
        name="navigate-next"
        {...iconConfig}
        style={{ marginLeft: "auto" }}
      />
    </Button>
  );

  return (
    <FadeView>
      <View
        testID="about-screen"
        className={`flex flex-col h-full ${landscape ? "flex-row" : ""}`}
      >
        <Image
          style={{
            resizeMode: "cover",
            height: landscape ? "100%" : 250,
            width: landscape ? "50%" : "100%",
          }}
          source={require("../images/finance.jpg")}
        />
        <ScrollView
          className="p-5"
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 20,
          }}
        >
          <Text className="my-2 text-black dark:text-white text-base">
            Wallet Digitalz foi desenvolvido com o objetivo de auxiliá-lo na
            organização das suas finanças.
          </Text>
          <Text className="my-2 text-black dark:text-white text-base">
            Proporcionamos uma maneira simplificada para que você registre suas
            despesas e valores.
          </Text>
          <Text className="my-2 text-black dark:text-white text-base">
            Tenha a liberdade de criar seus registros de forma intuitiva, com a
            flexibilidade de deletá-los e atualizá-los conforme necessário.
          </Text>
          {renderButton(
            "Política de Privacidade",
            "Acessar a Política de Privacidade",
            "https://walletdigitalz.web.app/privacy"
          )}
          {renderButton(
            "walletdigitalz.web.app",
            "Acessar site walletdigitalz.web.app",
            "https://walletdigitalz.web.app"
          )}
          {renderButton(
            "Criar.Art",
            "Acessar site criar.art",
            "https://criar.art/contact"
          )}
        </ScrollView>
      </View>
    </FadeView>
  );
}
