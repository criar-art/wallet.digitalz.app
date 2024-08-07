import { ScrollView, Text, View } from "react-native";
import useOrientation from "@hooks/useOrientation";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setModalBudgetTransaction } from "@store/modalsSlice";
import { RootState } from "@store";
import { setBudgetTransactionData } from "@store/commonSlice";
import { setDeleteTransaction } from "@store/budgetSlice";
import { formatDate } from "@utils/date";
import {
  useNavigation,
  ParamListBase,
  NavigationProp,
  useRoute,
} from "@react-navigation/native";
import { FontAwesome} from "@expo/vector-icons";
import { NumericFormat } from "react-number-format";
import { currencySymbol } from "@utils/locale";
import utils from "@utils";
import { useTranslation } from "react-i18next";
import { useColorScheme } from "nativewind";
import { useState } from "react";
import Item from "./Item";

export default function BudgetScreen() {
  const route: any = useRoute();
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const dispatch = useAppDispatch();
  const { landscape } = useOrientation();
  const { colorScheme } = useColorScheme();
  const { t } = useTranslation();
  const common = useAppSelector((state: RootState) => state.commonState);
  const budgets = useAppSelector(
    (state: RootState) => state.budgetState.budgets
  );
  const idBudget = route.params?.id;
  const budgetContent = budgets.find((item: any) => item.id === idBudget);
  const [optionsShow, setOptionsShow] = useState(null);

  function handlePressOptionsShow(id: any) {
    setOptionsShow((prevActiveItem: any) =>
      prevActiveItem === id ? null : id
    );
  }

  function edit(target: any) {
    dispatch(setModalBudgetTransaction({ id: route.params.id, type: 'edit' }));
    dispatch(setBudgetTransactionData({ ...target }));
  }

  function remove(id: string) {
    dispatch(setDeleteTransaction({ idBudget: route.params.id, idTransaction: id } as any));
  }

  return (
    <View testID="home-screen" className="flex-1 flex-col">
      <View className="p-4 m-3 bg-gray-300 dark:bg-zinc-800 rounded-lg">
        <Text className="text-black dark:text-white text-xl">{budgetContent?.name}</Text>
        {!!budgetContent?.description && (
          <Text className="text-black dark:text-white text-base">{budgetContent?.description}</Text>
        )}
        <NumericFormat
          value={budgetContent?.value}
          displayType={"text"}
          thousandSeparator={"."}
          decimalSeparator={","}
          decimalScale={2}
          fixedDecimalScale
          prefix={`${currencySymbol} `}
          renderText={(value: string) => (
            <View className="flex flex-row items-center">
              <Text className="text-black dark:text-white mr-2">
                {t("common.total")}
              </Text>
              <Text className="text-black dark:text-white font-bold text-xl">
                {utils.parseMoney(value, common.eyeStatus)}
              </Text>
            </View>
          )}
        />
        <View className="flex flex-row items-center">
          <FontAwesome
            name="calendar"
            size={20}
            color={colorScheme === "dark" ? "white" : "black"}
          />
          <Text className="ml-2 text-black dark:text-white text-base mr-2">
            Create: {budgetContent?.date_create && formatDate(budgetContent?.date_create)}
          </Text>
        </View>
        <View className="flex flex-row items-center">
          <FontAwesome
            name="calendar"
            size={20}
            color={colorScheme === "dark" ? "white" : "black"}
          />
          <Text className="ml-2 text-black dark:text-white text-base">
            End: {budgetContent?.date_end && formatDate(budgetContent?.date_end)}
          </Text>
        </View>
      </View>
      {budgetContent?.transactions.length ? (
        <>
          <Text className="py-2 mx-3 mb-3 text-black dark:text-white text-base">
            Money Register
          </Text>
          <ScrollView
            className="flex flex-1"
            scrollEventThrottle={16}
            contentContainerStyle={{
              paddingBottom: 80,
            }}
          >
            {budgetContent?.transactions.map((item: any) => (
              <Item
                key={item.id}
                item={item}
                eyeStatus={common.eyeStatus}
                edit={() => edit(item)}
                remove={() => remove(item)}
                optionsShow={optionsShow}
                setOptionsShow={setOptionsShow}
                handlePressOptionsShow={handlePressOptionsShow}
              />
            ))}
          </ScrollView>
        </>
      ) : (
        <Text className="p-4 text-black dark:text-white text-base text-center">
          Create first money register for budget
        </Text>
      )}
    </View>
  );
}
