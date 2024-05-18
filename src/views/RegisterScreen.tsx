import { View } from "react-native";
import useOrientation from "../hooks/useOrientation";
import ListRegisters from "../components/ListRegisters";

export type Props = {
  type: string;
};

export default function RegisterScreen({ type }: Props) {
  const orientation = useOrientation();

  return (
    <View
      testID={`${type}-screen`}
      className={`flex-1 justify-between flex-col ${
        orientation === 4 || orientation === 3 ? "mr-[90]" : ""
      }`}
    >
      <ListRegisters type={type} />
    </View>
  );
}
