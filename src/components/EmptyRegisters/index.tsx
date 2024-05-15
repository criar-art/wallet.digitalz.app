import { Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Props } from "./types";

export default function EmptyRegisters(props: Props) {
  return (
    <View
      testID={props.testID}
      className="flex flex-col items-center justify-center min-h-full"
    >
      <MaterialCommunityIcons
        name="sticker-alert-outline"
        size={60}
        color="black"
      />
      <Text className="text-black text-center text-xl p-5">
        Nenhum registro cadastrado.
      </Text>
    </View>
  );
}
