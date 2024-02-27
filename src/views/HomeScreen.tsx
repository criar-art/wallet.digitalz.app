import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "../components/Button";
import PanelsRegisters from "../components/PanelsRegisters";

import { useAppDispatch } from '../store/hooks';
import { setModalRegister } from "../store/commonSlice";

export default function Home() {
  const dispatch = useAppDispatch();

  return (
    <View testID="home-screen" className="p-5">
      <Button
        text="Novo Registro"
        backgroundColor="bg-green-600"
        textColor="text-white"
        onPress={() => dispatch(setModalRegister(true))}
        icon={<MaterialIcons name="add-circle" size={22} color="white" />}
      />
      <PanelsRegisters />
    </View>
  );
}
