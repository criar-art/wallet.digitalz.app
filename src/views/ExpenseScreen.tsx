import { View } from "react-native";
import ListRegisters from "../components/ListRegisters";

export default function ExpenseScreen() {
  return (
    <View testID="expense-screen" className="px-5">
      <ListRegisters type="expense" />
    </View>
  );
}
