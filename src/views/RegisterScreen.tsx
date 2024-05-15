import { View } from "react-native";
import ListRegisters from "../components/ListRegisters";

export type Props = {
  type: string;
};

export default function RegisterScreen({ type }: Props) {
  return (
    <View testID={`${type}-screen`}>
      <ListRegisters type={type} />
    </View>
  );
}
