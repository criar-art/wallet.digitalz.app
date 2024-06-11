import { TouchableOpacity, Text, View } from "react-native";
import { NumericFormat } from "react-number-format";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  useNavigation,
  ParamListBase,
  NavigationProp,
} from "@react-navigation/native";
import { useColorScheme } from "nativewind";
import utils from "@utils";
import { useBalance } from "@hooks/useBalance";
import useIsTablet from "@hooks/useIsTablet";
import useOrientation from "@hooks/useOrientation";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { RootState } from "@store";
import { setModalInfo } from "@store/modalsSlice";
import { useTranslation } from "react-i18next";
import { currencySymbol } from "@utils/locale";
import { Props } from "./types";

export default function ItemList(props: Props) {
  const { t } = useTranslation();
  const { landscape } = useOrientation();
  const isTablet = useIsTablet();
  const dispatch = useAppDispatch();
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const common = useAppSelector((state: RootState) => state.commonState);
  const { colorScheme } = useColorScheme();
  const { getQuantity } = useBalance();

  return (
    <TouchableOpacity
      testID={props.testID}
      onPress={() =>
        utils.checkTypeTouchable(props.type)
          ? navigation.navigate(utils.capitalize(props.type))
          : dispatch(setModalInfo(props.type))
      }
      className={`flex flex-row justify-between items-center border-l-4 bg-white dark:bg-zinc-800 p-6 mt-6 rounded-lg shadow-lg ${utils.renderBorderType(
        props.type
      )} ${
        props.value < 0 ? "bg-red-100 dark:bg-red-900 border-red-600" : ""
      } ${landscape || isTablet ? "mx-3" : "mx-5"}`}
    >
      <NumericFormat
        value={props.value}
        displayType={"text"}
        thousandSeparator={"."}
        decimalSeparator={","}
        decimalScale={2}
        fixedDecimalScale
        prefix={`${currencySymbol} `}
        renderText={(value: string) => (
          <View className="flex">
            <Text className="text-black dark:text-white">
              {t("common.total")} {t(`common.${props.type}`)}
            </Text>
            <Text className="text-black dark:text-white font-bold text-xl">
              {utils.parseMoney(value, common.eyeStatus)}
            </Text>
          </View>
        )}
      />
      {props.type == "liquid" && props.value < 0 && (
        <View
          className={`bg-red-600 p-2 py-1 absolute -top-3 left-2 rounded-full flex flex-nowrap`}
        >
          <Text className="text-white text-xs">
            {t("common.wallet_negative")}
          </Text>
        </View>
      )}
      {!!getQuantity(props.type) && (
        <View
          className={`bg-black dark:bg-white p-2 py-1 absolute -top-3 left-2 rounded-full flex flex-nowrap`}
        >
          <Text className="text-white dark:text-black text-xs">
            {getQuantity(props.type)} {t("common.register")}
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
      {utils.checkTypeTouchable(props.type) && (
        <MaterialIcons
          name="navigate-next"
          size={30}
          color={colorScheme === "dark" ? "white" : "black"}
        />
      )}
    </TouchableOpacity>
  );
}
