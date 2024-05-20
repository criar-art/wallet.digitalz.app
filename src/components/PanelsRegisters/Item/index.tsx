import { TouchableOpacity, Text, View } from "react-native";
import { NumericFormat } from "react-number-format";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  useNavigation,
  ParamListBase,
  NavigationProp,
} from "@react-navigation/native";
import { useColorScheme } from "nativewind";
import {
  renderBorderType,
  types,
  capitalize,
  checkTypeTouchable,
  parseMoney,
} from "../../../utils";
import useOrientation from "../../../hooks/useOrientation";
import { useBalance } from "../../../hooks/useBalance";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { RootState } from "../../../store";
import { setModalInfo } from "../../../store/commonSlice";
import { Props } from "./types";

export default function ItemList(props: Props) {
  const { landscape } = useOrientation();
  const dispatch = useAppDispatch();
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const common = useAppSelector((state: RootState) => state.commonState);
  const { colorScheme } = useColorScheme();
  const { getQuantity } = useBalance();

  return (
    <TouchableOpacity
      onPress={() =>
        checkTypeTouchable(props.type)
          ? navigation.navigate(capitalize(props.type))
          : dispatch(setModalInfo(props.type))
      }
      className={`flex flex-row justify-between items-center border-l-4 mb-5 bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg ${renderBorderType(
        props.type
      )} ${
        props.value < 0 ? "bg-red-100 dark:bg-red-900 border-red-600" : ""
      } ${landscape ? "flex-auto basis-1/3 mr-2 ml-3" : "w-full"}`}
    >
      <NumericFormat
        value={props.value}
        displayType={"text"}
        thousandSeparator={"."}
        decimalSeparator={","}
        decimalScale={2}
        fixedDecimalScale
        prefix={"R$ "}
        renderText={(value: string) => (
          <View className="flex">
            <Text className="text-black dark:text-white">
              Total {types[props.type]}
            </Text>
            <Text className="text-black dark:text-white font-bold text-xl">
              {parseMoney(value, common.eyeStatus)}
            </Text>
          </View>
        )}
      />
      {props.type == "liquid" && props.value < 0 && (
        <View
          className={`bg-red-600 p-2 py-1 absolute -top-3 left-2 rounded-full flex flex-nowrap`}
        >
          <Text className="text-white text-xs">Carteira Negativa</Text>
        </View>
      )}
      {!!getQuantity(props.type) && (
        <View
          className={`bg-black dark:bg-white p-2 py-1 absolute -top-3 left-2 rounded-full flex flex-nowrap`}
        >
          <Text className="text-white dark:text-black text-xs">
            {getQuantity(props.type)} Registro
            {`${getQuantity(props.type) > 1 ? "s" : ""}`}
          </Text>
        </View>
      )}
      {props.type == "liquid" && (
        <MaterialIcons
          name="attach-money"
          size={30}
          color={props.value < 0 ? "#f00" : "#aaa"}
        />
      )}
      {props.type == "patrimony" && (
        <MaterialCommunityIcons name="gold" size={30} color="#aaa" />
      )}
      {checkTypeTouchable(props.type) && (
        <MaterialIcons
          name="navigate-next"
          size={30}
          color={colorScheme === "dark" ? "white" : "black"}
        />
      )}
    </TouchableOpacity>
  );
}
