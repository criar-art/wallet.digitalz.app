import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function App() {
  return (
    <View
      testID="app-container"
      className="flex-1 items-center justify-center bg-red-600"
    >
      <Text className="text-white">wallet.digitalz.app</Text>
      <StatusBar style="auto" />
    </View>
  );
}
