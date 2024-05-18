import { Image, Linking, View, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Zocial } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import useOrientation from "../hooks/useOrientation";
import { Fontisto } from "@expo/vector-icons";
import FadeView from "../components/FadeView";
import Button from "../components/Button";

export default function ContactScreen() {
  const { colorScheme } = useColorScheme();
  const orientation = useOrientation();

  return (
    <FadeView>
      <View
        testID="contact-screen"
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
          source={require("../images/world.png")}
        />
        <ScrollView
          className={`px-5 ${orientation === 4 || orientation === 3 ? "" : ""}`}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 20,
          }}
        >
          <Button
            text="criar.art"
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
            text="criar.art.tecnologia"
            label="Acessar Instagram criar.art.tecnologia"
            textColor="text-lg text-black dark:text-white"
            onPress={() =>
              Linking.openURL("http://instagram.com/criar.art.tecnologia")
            }
            icon={
              <Zocial
                name="instagram"
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
            text="contato@criar.art"
            label="Enviar email para contato@criar.art"
            textColor="text-lg text-black dark:text-white"
            onPress={() =>
              Linking.openURL(
                "mailto:contato@criar.art?subject=Wallet Digitalz APP&body=Olá tudo bem?\nPreciso de ajuda com"
              )
            }
            icon={
              <MaterialIcons
                name="email"
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
            text="+55 (83) 98210-7202"
            label="Enviar mensagemo no whatsapp Criar.Art"
            textColor="text-lg text-black dark:text-white"
            onPress={() =>
              Linking.openURL(
                "https://wa.me/5583982107202?text=Ol%C3%A1+tudo+bem%3F"
              )
            }
            icon={
              <Fontisto
                name="whatsapp"
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
            text="@lucasferreiralimax"
            label="Acessar linkedin do Lucas Ferreira"
            textColor="text-lg text-black dark:text-white"
            onPress={() =>
              Linking.openURL("https://linkedin.com/in/lucasferreiralimax")
            }
            icon={
              <Zocial
                name="linkedin"
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
        </ScrollView>
      </View>
    </FadeView>
  );
}
