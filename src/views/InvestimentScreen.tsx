import { View } from "react-native";
import ListRegisters from "../components/ListRegisters";

export default function InvestimentScreen() {
  return (
    <View testID="investiment-screen">
      <ListRegisters type="investiment" />
    </View>
  );
}
