import { View } from "react-native";
import useOrientation from "../hooks/useOrientation";
import PanelsRegisters from "../components/PanelsRegisters";

export default function HomeScreen() {
  const orientation = useOrientation();

  return (
    <View
      testID="home-screen"
      className={`flex-1 justify-between flex-col ${
        orientation === 4 || orientation === 3 ? "mr-[100]" : ""
      }`}
    >
      <PanelsRegisters />
    </View>
  );
}
