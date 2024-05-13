import { Image, Linking, Text, TouchableOpacity, View } from "react-native";

import FadeView from "../components/FadeView";
import { MaterialIcons } from "@expo/vector-icons";
import { Zocial } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

export default function ContactScreen() {
  return (
    <FadeView>
      <View testID="contact-screen" className="p-5">
        <Text className="my-2 text-black text-base">
          Se precisa de ajuda ou feedback.
        </Text>
        <Text className="my-2 text-black text-base">Entre em contato.</Text>
        <TouchableOpacity
          className="my-2 p-2 bg-white rounded-lg shadow-lg flex flex-row"
          onPress={() => Linking.openURL("https://criar.art/contact")}
        >
          <Fontisto name="world" size={22} color="black" />
          <Text className="ml-2 text-black text-black text-base">
            criar.art
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="my-2 p-2 bg-white rounded-lg shadow-lg flex flex-row"
          onPress={() =>
            Linking.openURL(
              "mailto:contato@criar.art?subject=Wallet Digitalz APP&body=Olá tudo bem?\nPreciso de ajuda com"
            )
          }
        >
          <MaterialIcons name="email" size={25} color="black" />
          <Text className="ml-2 text-black text-black text-center text-base">
            contato@criar.art
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="my-2 p-2 bg-white rounded-lg shadow-lg flex flex-row"
          onPress={() =>
            Linking.openURL("https://linkedin.com/in/lucasferreiralimax")
          }
        >
          <Zocial name="linkedin" size={18} color="rgb(10, 102, 194)" />
          <Text className="ml-2 text-black text-black text-base">
            linkedin.com/in/lucasferreiralimax
          </Text>
        </TouchableOpacity>
        <Image
          className="mt-5"
          style={{ resizeMode: "stretch", height: 250, width: "100%" }}
          source={require("../images/world.png")}
        />
      </View>
    </FadeView>
  );
}
