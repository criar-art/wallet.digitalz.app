import { View } from "react-native";
import ListRegisters from "@components/common/ListRegisters";
import { Props } from "./type";

export default function RegisterScreen({ type }: Props) {
  return (
    <View testID={`${type}-screen`} className="flex-1 justify-between flex-col">
      <ListRegisters type={type} />
    </View>
  );
}
