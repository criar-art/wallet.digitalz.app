import { Image, Linking, View, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Zocial } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import FadeView from "../components/FadeView";
import Button from "../components/Button";

export default function ContactScreen() {
  return (
    <FadeView>
      <View testID="contact-screen" className="flex flex-col h-full">
        <Image
          style={{ resizeMode: "stretch", height: 250, width: "100%" }}
          source={require("../images/world.png")}
        />
        <ScrollView
          className="px-5"
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 20,
          }}
        >
          <Button
            text="criar.art"
            label="Acessar site criar.art"
            textColor="text-black"
            onPress={() => Linking.openURL("https://criar.art/contact")}
            icon={<Fontisto name="world" size={28} color="black" />}
            className="justify-start mt-4 p-6 shadow-lg bg-white"
          />
          <Button
            text="criar.art.tecnologia"
            label="Acessar Instagram criar.art.tecnologia"
            textColor="text-black"
            onPress={() =>
              Linking.openURL("http://instagram.com/criar.art.tecnologia")
            }
            icon={<Zocial name="instagram" size={28} color="black" />}
            className="justify-start mt-4 p-6 shadow-lg bg-white"
          />
          <Button
            text="contato@criar.art"
            label="Enviar email para contato@criar.art"
            textColor="text-black"
            onPress={() =>
              Linking.openURL(
                "mailto:contato@criar.art?subject=Wallet Digitalz APP&body=Olá tudo bem?\nPreciso de ajuda com"
              )
            }
            icon={<MaterialIcons name="email" size={28} color="black" />}
            className="justify-start mt-4 p-6 shadow-lg bg-white"
          />
          <Button
            text="+55 (83) 98210-7202"
            label="Enviar mensagemo no whatsapp Criar.Art"
            textColor="text-black"
            onPress={() =>
              Linking.openURL("https://wa.me/5583982107202?text=Ol%C3%A1+tudo+bem%3F")
            }
            icon={<Fontisto name="whatsapp" size={28} color="black" />}
            className="justify-start mt-4 p-6 shadow-lg bg-white"
          />
          <Button
            text="@lucasferreiralimax"
            label="Acessar linkedin do Lucas Ferreira"
            textColor="text-black"
            onPress={() =>
              Linking.openURL("https://linkedin.com/in/lucasferreiralimax")
            }
            icon={<Zocial name="linkedin" size={28} color="black" />}
            className="justify-start mt-4 p-6 shadow-lg bg-white"
          />
        </ScrollView>
      </View>
    </FadeView>
  );
}
