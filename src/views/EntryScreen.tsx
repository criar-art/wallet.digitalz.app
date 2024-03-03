import { View } from "react-native";
import ListRegisters from "../components/ListRegisters";

export default function EntryScreen() {
  return (
    <View testID="entry-screen" className="px-5">
      <ListRegisters type="entry" />
    </View>
  );
}
