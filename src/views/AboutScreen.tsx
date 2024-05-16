import { Image, Text, View, ScrollView, Linking } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import FadeView from "../components/FadeView";
import Button from "../components/Button";

export default function AboutScreen() {
  return (
    <FadeView>
      <View testID="about-screen" className="flex flex-col h-full">
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
          <Text className="my-2 text-black text-base">
            Wallet Digitalz foi desenvolvido com o objetivo de auxiliá-lo na
            organização das suas finanças.
          </Text>
          <Text className="my-2 text-black text-base">
            Proporcionamos uma maneira simplificada para que você registre suas
            despesas e valores.
          </Text>
          <Text className="my-2 text-black text-base">
            Tenha a liberdade de criar seus registros de forma intuitiva, com a
            flexibilidade de deletá-los e atualizá-los conforme necessário.
          </Text>
          <Button
            text="walletdigitalz.web.app"
            label="Acessar site walletdigitalz.web.app"
            textColor="text-black"
            onPress={() => Linking.openURL("https://walletdigitalz.web.app")}
            icon={<Fontisto name="world" size={28} color="black" />}
            className="justify-start mt-4 p-6 shadow-lg bg-white"
          />
          <Button
            text="criar.art"
            label="Acessar site criar.art"
            textColor="text-black"
            onPress={() => Linking.openURL("https://criar.art/contact")}
            icon={<Fontisto name="world" size={28} color="black" />}
            className="justify-start mt-4 mb-4 p-6 shadow-lg bg-white"
          />
        </ScrollView>
      </View>
    </FadeView>
  );
}
