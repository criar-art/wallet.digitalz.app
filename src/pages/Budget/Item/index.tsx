import { memo, useEffect, useRef } from "react";
import { Text, View, Animated, TouchableOpacity } from "react-native";
import { NavigationProp, ParamListBase, useIsFocused, useNavigation } from "@react-navigation/native";
import { NumericFormat } from "react-number-format";
import { useColorScheme } from "nativewind";
import { useTranslation } from "react-i18next";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { setDuplicateBudget } from "@store/budgetSlice";
import Button from "@components/common/Button";
import { currencySymbol } from "@utils/locale";
import utils from "@utils";
import RenderBadge from "../RenderBadge";
import { Props } from "./types";

function ItemBudget({ item, optionsShow, setOptionsShow, handlePressOptionsShow, twClass, testID, eyeStatus, edit, remove }: Props) {
  const { colorScheme } = useColorScheme();
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const isOptionsVisible = optionsShow === item.id;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isFocused && setOptionsShow) {
      setOptionsShow(null);
    }
  }, [isFocused]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: isOptionsVisible ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();

    return () => {
      fadeAnim.setValue(0);
    };
  }, [isOptionsVisible]);

  const totalTransactionsValue = typeof item.totalTransactionsValue === 'number' ? item.totalTransactionsValue : 0;
  const remainingBudget = typeof item.remainingBudget === 'number' ? item.remainingBudget : 0;
  const isOverBudget = typeof item.isOverBudget === 'boolean' ? item.isOverBudget : false;
  const isCompleteBudget = totalTransactionsValue == item.value && remainingBudget == 0;

  const getBadgeType = (): "remaining" | "within" | "complete" => {
    if (isCompleteBudget) return "complete";
    return isOverBudget ? "remaining" : "within";
  };

  const duplicate = (budget: any) => {
    dispatch(setDuplicateBudget(budget.id)); // Chama a ação para duplicar o orçamento
  };

  return (
    <TouchableOpacity
      key={item.id}
      testID={testID}
      className={`pt-4 ${twClass}`}
      onPress={() => {
        if (setOptionsShow) {
          handlePressOptionsShow(item.id);
        } else {
          navigation.navigate('Transaction', { id: item.id });
        }
      }}
    >
      <View className="p-4 bg-white dark:bg-zinc-800 rounded-lg flex-1">
        <RenderBadge type={getBadgeType()} />
        <View className="flex flex-row items-start w-full border-b-2 border-zinc-200 dark:border-zinc-700 pb-2 mb-2">
          <Text className="flex-1 text-black dark:text-white text-xl">{item.name}</Text>
          <NumericFormat
            value={item.value}
            displayType={"text"}
            thousandSeparator={"."}
            decimalSeparator={","}
            decimalScale={2}
            fixedDecimalScale
            prefix={`${currencySymbol} `}
            renderText={(value: string) => (
              <Text className={`text-black dark:text-white font-bold text-xl ${isCompleteBudget ? 'text-green-500' : ''}`}>
                {utils.parseMoney(value, eyeStatus)}
              </Text>
            )}
          />
        </View>
        {setOptionsShow && item.description && (
          <Text className="text-black dark:text-white text-lg">
            {item.description}
          </Text>
        )}
        <NumericFormat
          value={totalTransactionsValue}
          displayType={"text"}
          thousandSeparator={"."}
          decimalSeparator={","}
          decimalScale={2}
          fixedDecimalScale
          prefix={`${currencySymbol} `}
          renderText={(value: string) => (
            <View className="flex flex-row items-center mt-2">
              <FontAwesome6 name="money-bill-trend-up" size={20} color={colorScheme === "dark" ? "white" : "black"} />
              <Text className="text-black dark:text-white mx-2 text-base">
                {t("common.totalTransactionsValue")}:
              </Text>
              <Text className={`text-black dark:text-white font-bold text-base ${isCompleteBudget ? 'text-green-500' : ''}`}>
                {utils.parseMoney(value, eyeStatus)}
              </Text>
            </View>
          )}
        />
        {!isCompleteBudget && (
          <NumericFormat
            value={remainingBudget}
            displayType={"text"}
            thousandSeparator={"."}
            decimalSeparator={","}
            decimalScale={2}
            fixedDecimalScale
            prefix={`${currencySymbol} `}
            renderText={(value: string) => (
              <View className="flex flex-row items-center mt-2">
                <FontAwesome6 name="money-bill-transfer" size={17} color={colorScheme === "dark" ? "white" : "black"} />
                <Text className="text-black dark:text-white mx-2 text-base">
                  {isOverBudget ? t("common.remainingBudgetOver"): t("common.remainingBudget")}:
                </Text>
                <Text className={`text-base ${isOverBudget ? 'text-red-500 dark:text-red-400' : 'text-yellow-600 dark:text-yellow-300'}`}>
                  {utils.parseMoney(value, eyeStatus)}
                </Text>
              </View>
            )}
          />
        )}
        {setOptionsShow && (
          <>
            <View className="flex flex-row items-center mt-2">
              <FontAwesome
                name="calendar"
                size={20}
                color={colorScheme === "dark" ? "white" : "black"}
              />
              <Text className="ml-2 text-black dark:text-white text-base mr-2">
                {t("common.createDate")}: {item.date_create && utils.formatDate(item.date_create)}
              </Text>
            </View>
            <View className="flex flex-row items-center mt-2">
              <FontAwesome
                name="calendar"
                size={20}
                color={colorScheme === "dark" ? "white" : "black"}
              />
              <Text className="ml-2 text-black dark:text-white text-base">
                {t("common.endDate")}: {item.date_end && utils.formatDate(item.date_end)}
              </Text>
            </View>
          </>
        )}
        <Animated.View
          className="flex flex-row items-center z-20 absolute top-0 right-0 bottom-0"
          style={{ opacity: fadeAnim }}
          pointerEvents={isOptionsVisible ? "auto" : "none"}
        >
          <Button
            twClass="z-20 w-14 h-14 my-2 rounded-full border-2 border-gray-300 dark:border-zinc-500 bg-white dark:bg-zinc-800"
            onPress={edit}
            label={`${t("common.edit_budget")} ${item.name}`}
            icon={
              <MaterialIcons
                name="edit"
                size={22}
                color={colorScheme === "dark" ? "white" : "black"}
              />
            }
          />
          <Button
            twClass="z-20 w-14 h-14 my-2 mx-2 rounded-full border-2 border-gray-300 bg-white dark:bg-zinc-800"
            onPress={() => duplicate(item)}
            label={`${t("common.duplicate_budget")} ${item.name}`}
            icon={
              <MaterialCommunityIcons
                name="content-duplicate"
                size={22}
                color={colorScheme === "dark" ? "white" : "black"}
              />
            }
          />
          <Button
            twClass="z-20 w-14 h-14 m-2 mr-4 rounded-full border-2 border-red-300 bg-white dark:bg-zinc-800"
            onPress={remove}
            label={`${t("common.delete_budget")} ${item.name}`}
            icon={
              <MaterialCommunityIcons
                name="trash-can-outline"
                size={22}
                color={colorScheme === "dark" ? "rgb(252 165 165)" : "red"}
              />
            }
          />
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
}

export default memo(ItemBudget);
