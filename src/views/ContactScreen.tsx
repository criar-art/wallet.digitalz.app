import { Text, View } from "react-native";

export default function ContactScreen() {
  return (
    <View
      testID="contact-screen"
      className="p-5"
    >
      <Text className="my-2 text-black">Se você tem algum feedback ou precisa de ajuda.</Text>
      <Text className="my-2 text-black">Entre em contato conosco.</Text>
      <Text className="my-2 text-black">contato@criar.art</Text>
      <Text className="my-2 text-black">linkedin.com/in/lucasferreiralimax</Text>
    </View>
  );
}
