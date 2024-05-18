import { View } from "react-native";
import ListRegisters from "../components/ListRegisters";

export type Props = {
  type: string;
};

export default function RegisterScreen({ type }: Props) {
  return (
    <View
      testID={`${type}-screen`}
      className="dark:bg-zinc-900 flex-1 justify-between flex-col"
    >
      <ListRegisters type={type} />
    </View>
  );
}
