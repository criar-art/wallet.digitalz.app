import { View } from "react-native";
import ListRegisters from "../components/ListRegisters";

export default function ExpenseScreen() {
  return (
    <View testID="expense-screen">
      <ListRegisters type="expense" />
    </View>
  );
}
