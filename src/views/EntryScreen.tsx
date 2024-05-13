import { View } from "react-native";
import ListRegisters from "../components/ListRegisters";

export default function EntryScreen() {
  return (
    <View testID="entry-screen">
      <ListRegisters type="entry" />
    </View>
  );
}
