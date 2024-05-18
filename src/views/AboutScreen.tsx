import { Image, Text, View, ScrollView, Linking } from "react-native";
import { Fontisto, MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import useOrientation from "../hooks/useOrientation";
import FadeView from "../components/FadeView";
import Button from "../components/Button";

export default function AboutScreen() {
  const { colorScheme } = useColorScheme();
  const orientation = useOrientation();

  return (
    <FadeView>
      <View
        testID="about-screen"
        className={`flex flex-col h-full ${
          orientation === 4 || orientation === 3 ? "flex-row" : ""
        }`}
      >
        <Image
          style={{
            resizeMode: "cover",
            height: orientation === 4 || orientation === 3 ? "100%" : 250,
            width: orientation === 4 || orientation === 3 ? "50%" : "100%",
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
          <Button
            text="Política de Privacidade"
            label="Acessar a Política de Privacidade"
            textColor="text-lg text-black dark:text-white"
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
          >
            <MaterialIcons
              name="navigate-next"
              size={28}
              color={colorScheme === "dark" ? "white" : "black"}
              style={{ marginLeft: "auto" }}
            />
          </Button>
          <Button
            text="walletdigitalz.web.app"
            label="Acessar site walletdigitalz.web.app"
            textColor="text-lg text-black dark:text-white"
            onPress={() => Linking.openURL("https://walletdigitalz.web.app")}
            icon={
              <Fontisto
                name="world"
                size={28}
                color={colorScheme === "dark" ? "white" : "black"}
              />
            }
            className="justify-start mt-4 p-6 shadow-lg bg-white dark:bg-zinc-800"
          >
            <MaterialIcons
              name="navigate-next"
              size={28}
              color={colorScheme === "dark" ? "white" : "black"}
              style={{ marginLeft: "auto" }}
            />
          </Button>
          <Button
            text="Criar.Art"
            label="Acessar site criar.art"
            textColor="text-lg text-black dark:text-white"
            onPress={() => Linking.openURL("https://criar.art/contact")}
            icon={
              <Fontisto
                name="world"
                size={28}
                color={colorScheme === "dark" ? "white" : "black"}
              />
            }
            className="justify-start mt-4 mb-4 p-6 shadow-lg bg-white dark:bg-zinc-800"
          >
            <MaterialIcons
              name="navigate-next"
              size={28}
              color={colorScheme === "dark" ? "white" : "black"}
              style={{ marginLeft: "auto" }}
            />
          </Button>
        </ScrollView>
      </View>
    </FadeView>
  );
}
