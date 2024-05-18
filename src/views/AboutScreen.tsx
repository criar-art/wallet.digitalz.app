import { Image, Text, View, ScrollView, Linking } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import FadeView from "../components/FadeView";
import Button from "../components/Button";

export default function AboutScreen() {
  const { colorScheme } = useColorScheme();

  return (
    <FadeView>
      <View
        testID="about-screen"
        className="dark:bg-zinc-900 flex flex-col h-full"
      >
        <Image
          style={{ resizeMode: "stretch", height: 250, width: "100%" }}
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
          <Button
            text="Política de Privacidade"
            label="Acessar a Política de Privacidade"
            textColor="text-black dark:text-white"
            onPress={() =>
              Linking.openURL("https://walletdigitalz.web.app/privacy")
            }
            icon={
              <Fontisto
                name="world"
                size={28}
                color={colorScheme === "dark" ? "white" : "black"}
              />
            }
            className="justify-start mt-4 p-6 shadow-lg bg-white dark:bg-zinc-800"
          />
          <Button
            text="walletdigitalz.web.app"
            label="Acessar site walletdigitalz.web.app"
            textColor="text-black dark:text-white"
            onPress={() => Linking.openURL("https://walletdigitalz.web.app")}
            icon={
              <Fontisto
                name="world"
                size={28}
                color={colorScheme === "dark" ? "white" : "black"}
              />
            }
            className="justify-start mt-4 p-6 shadow-lg bg-white dark:bg-zinc-800"
          />
          <Button
            text="Criar.Art"
            label="Acessar site criar.art"
            textColor="text-black dark:text-white"
            onPress={() => Linking.openURL("https://criar.art/contact")}
            icon={
              <Fontisto
                name="world"
                size={28}
                color={colorScheme === "dark" ? "white" : "black"}
              />
            }
            className="justify-start mt-4 mb-4 p-6 shadow-lg bg-white dark:bg-zinc-800"
          />
        </ScrollView>
      </View>
    </FadeView>
  );
}
