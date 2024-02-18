import { Text, View } from "react-native";

export default function About() {
  return (
    <View
      testID="about-screen"
      className="p-5"
    >
      <Text className="my-2 text-black">Wallet Digitalz foi desenvolvido com o objetivo de auxiliá-lo na organização das suas finanças.</Text>
      <Text className="my-2 text-black">Proporcionamos uma maneira simplificada para que você registre suas despesas e valores.</Text>
      <Text className="my-2 text-black">Tenha a liberdade de criar seus registros de forma intuitiva, com a flexibilidade de deletá-los e atualizá-los conforme necessário.</Text>
    </View>
  );
}
