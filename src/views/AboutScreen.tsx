import { Image, Text, View } from "react-native";

import FadeView from "../components/FadeView";

export default function AboutScreen() {
  return (
    <FadeView>
      <View testID="about-screen" className="p-5">
        <Text className="my-2 text-black">
          Wallet Digitalz foi desenvolvido com o objetivo de auxiliá-lo na
          organização das suas finanças.
        </Text>
        <Text className="my-2 text-black">
          Proporcionamos uma maneira simplificada para que você registre suas
          despesas e valores.
        </Text>
        <Text className="my-2 text-black">
          Tenha a liberdade de criar seus registros de forma intuitiva, com a
          flexibilidade de deletá-los e atualizá-los conforme necessário.
        </Text>
        <Image
          style={{ resizeMode: "stretch", height: 250, width: "100%" }}
          source={require("../images/finance.jpg")}
        />
      </View>
    </FadeView>
  );
}
