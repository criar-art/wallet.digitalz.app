import { Image, Text, View, ScrollView } from "react-native";
import useOrientation from "@hooks/useOrientation";
import FadeView from "@components/animation/FadeView";
import ListLinks from "./ListLinks";

export default function AboutScreen() {
  const { landscape } = useOrientation();

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
          source={require("../../images/finance.jpg")}
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
          <ListLinks />
        </ScrollView>
      </View>
    </FadeView>
  );
}
