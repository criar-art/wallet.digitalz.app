import { View } from "react-native";
import PanelsRegisters from "@components/common/PanelsRegisters";

export default function HomeScreen() {
  return (
    <View testID="home-screen" className="flex-1 justify-between flex-col">
      <PanelsRegisters />
    </View>
  );
}
