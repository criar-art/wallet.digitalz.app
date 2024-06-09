import { View } from "react-native";
import PanelsRegisters from "@components/common/PanelsRegisters";
// import DevTest from "@components/beta/DevTest";

export default function HomeScreen() {
  return (
    <View testID="home-screen" className="flex-1 justify-between flex-col">
      {/* <DevTest /> */}
      <PanelsRegisters />
    </View>
  );
}
