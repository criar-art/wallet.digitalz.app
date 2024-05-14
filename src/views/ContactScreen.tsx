import { Image, Linking, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Zocial } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

import FadeView from "../components/FadeView";
import Button from "../components/Button";

export default function ContactScreen() {
  return (
    <FadeView>
      <View testID="contact-screen" className="p-5">
        <Text className="my-2 text-black text-base">
          Se precisa de ajuda ou feedback.
        </Text>
        <Text className="my-2 text-black text-base">Entre em contato.</Text>
        <Button
          text="criar.art"
          label="Acessar site criar.art"
          backgroundColor="bg-white"
          textColor="text-black"
          onPress={() => Linking.openURL("https://criar.art/contact")}
          icon={<Fontisto name="world" size={28} color="black" />}
          className="justify-start mt-4 p-6 shadow-lg"
        />
        <Button
          text="contato@criar.art"
          label="Enviar email para contato@criar.art"
          backgroundColor="bg-white"
          textColor="text-black"
          onPress={() =>
            Linking.openURL(
              "mailto:contato@criar.art?subject=Wallet Digitalz APP&body=Olá tudo bem?\nPreciso de ajuda com"
            )
          }
          icon={<MaterialIcons name="email" size={28} color="black" />}
          className="justify-start mt-4 p-6 shadow-lg"
        />
        <Button
          text="@lucasferreiralimax"
          label="Acessar linkedin do Lucas Ferreira"
          backgroundColor="bg-white"
          textColor="text-black"
          onPress={() =>
            Linking.openURL("https://linkedin.com/in/lucasferreiralimax")
          }
          icon={<Zocial name="linkedin" size={28} color="rgb(10, 102, 194)" />}
          className="justify-start mt-4 p-6 shadow-lg"
        />
        <Image
          className="mt-5 rounded-lg"
          style={{ resizeMode: "stretch", height: 250, width: "100%" }}
          source={require("../images/world.png")}
        />
      </View>
    </FadeView>
  );
}
