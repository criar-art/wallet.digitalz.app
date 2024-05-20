import { TouchableOpacity } from "react-native";
import { Props } from "./types";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import useOrientation from "../../hooks/useOrientation";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { setEyeStatus, setModalInfo } from "../../store/commonSlice";
import { RootState } from "../../store";
import TotalCategory from "../TotalCategory";

export default function AppDrawerHeader(props: Props) {
  const { landscape } = useOrientation();
  const { colorScheme } = useColorScheme();
  const dispatch = useAppDispatch();
  const common = useAppSelector((state: RootState) => state.commonState);
  const toggleEye = () => dispatch(setEyeStatus(!common.eyeStatus));
  const iconConfig = {
    size: 25,
    color: colorScheme === "dark" ? "white" : "black",
  };

  if (props.type === "header") {
    return (
      <>
        {(landscape) && (
          <TotalCategory
            className="top-[20] absolute"
            onPress={() => dispatch(setModalInfo(props.category))}
            type={String(props.category)}
          />
        )}
        <TouchableOpacity
          className="p-4 mr-4 rounded-full"
          onPress={toggleEye}
          accessibilityLabel={
            common.eyeStatus ? "Ocultar valores" : "Mostrar valores"
          }
        >
          <Ionicons
            name={common.eyeStatus ? "eye" : "eye-off"}
            {...iconConfig}
          />
        </TouchableOpacity>
      </>
    );
  }

  if (props.type === "back") {
    return (
      <TouchableOpacity
        className="p-4 mr-4 rounded-full"
        onPress={props.onPress}
        accessibilityLabel="Voltar página"
      >
        <MaterialIcons name="close" {...iconConfig} />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      className="p-4 ml-4 rounded-full"
      onPress={props.onPress}
      accessibilityLabel="Abrir menu drawer de páginas"
    >
      <MaterialIcons name="menu" {...iconConfig} />
    </TouchableOpacity>
  );
}
