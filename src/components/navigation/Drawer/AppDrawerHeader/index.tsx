import { TouchableOpacity } from "react-native";
import { Props } from "./types";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import useOrientation from "@hooks/useOrientation";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { setEyeStatus } from "@store/commonSlice";
import { setModalInfo } from "@store/modalsSlice";
import { RootState } from "@store";
import { useNavigation } from "@react-navigation/native";

// @todo analisar porque não esta importando className com alias
import TotalCategory from "../../../common/TotalCategory";

export default function AppDrawerHeader(props: Props) {
  const { landscape } = useOrientation();
  const { colorScheme } = useColorScheme();
  const dispatch = useAppDispatch();
  const common = useAppSelector((state: RootState) => state.commonState);
  const store = useAppSelector((state: RootState) => state.userState);
  const toggleEye = () => dispatch(setEyeStatus(!common.eyeStatus));
  const navigation: any = useNavigation();
  const iconConfig = {
    size: 25,
    color: colorScheme === "dark" ? "white" : "black",
  };

  if (props.type === "header") {
    return (
      <>
        {landscape && (
          <TotalCategory
            onPress={() => dispatch(setModalInfo(props.category))}
            type={String(props.category)}
            className={"top-[10] right-[75] absolute"}
          />
        )}
        <TouchableOpacity
          testID={props.testID}
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
        testID={props.testID}
        className="p-4 mr-4 rounded-full"
        onPress={() =>
          store.isLogin ? navigation.goBack() : navigation.navigate("Login")
        }
        accessibilityLabel="Voltar página"
      >
        <MaterialIcons
          name={store.isLogin ? "close" : "lock"}
          {...iconConfig}
        />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      testID={props.testID}
      className="p-4 ml-4 rounded-full"
      onPress={props.onPress}
      accessibilityLabel="Abrir menu drawer de páginas"
    >
      <MaterialIcons name="menu" {...iconConfig} />
    </TouchableOpacity>
  );
}
