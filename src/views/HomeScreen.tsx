import { View } from "react-native";
import PanelsRegisters from "../components/PanelsRegisters";

export default function HomeScreen() {
  return (
    <View testID="home-screen" className="p-5 flex-1 justify-between flex-col">
      <PanelsRegisters />
    </View>
  );
}
