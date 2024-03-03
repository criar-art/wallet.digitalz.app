import { Linking, Text, View } from "react-native";

export default function ContactScreen() {
  return (
    <View testID="contact-screen" className="p-5">
      <Text className="my-2 text-black">
        Se você tem algum feedback ou precisa de ajuda.
      </Text>
      <Text className="my-2 text-black">Entre em contato conosco.</Text>
      <Text
        className="my-2 text-black text-green-700 underline"
        onPress={() =>
          Linking.openURL(
            "mailto:support@example.com?subject=Wallet Digitalz APP&body=Olá tudo bem?\nPreciso de ajuda com"
          )
        }
      >
        contato@criar.art
      </Text>
      <Text
        className="my-2 text-black text-green-700 underline"
        onPress={() =>
          Linking.openURL("https://linkedin.com/in/lucasferreiralimax")
        }
      >
        linkedin.com/in/lucasferreiralimax
      </Text>
    </View>
  );
}
