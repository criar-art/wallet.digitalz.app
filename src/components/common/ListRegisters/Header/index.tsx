import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { setModalFilter, setModalInfo } from "@store/modalsSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import Button from "@components/common/Button";
import utils from "@utils";
import { Props } from "./types";
import {
  selectRegistersEntry,
  selectRegistersExpense,
  selectRegistersFilterEntry,
  selectRegistersFilterExpense,
  selectRegistersFilterInvestment,
  selectRegistersFilteredEntry,
  selectRegistersFilteredExpense,
  selectRegistersFilteredInvestment,
  selectRegistersInvestment,
} from "@store/commonSelects";
import { useTranslation } from "react-i18next";
import BalanceTotal from "@components/common/BalanceTotal";

export default function Header(props: Props) {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const dispatch = useAppDispatch();

  const getRegistersFilterEntry = useAppSelector(selectRegistersFilterEntry);
  const getRegistersEntry = useAppSelector(selectRegistersEntry);
  const getRegistersFilteredEntry = useAppSelector(
    selectRegistersFilteredEntry
  );

  const getRegistersFilterExpense = useAppSelector(
    selectRegistersFilterExpense
  );
  const getRegistersExpense = useAppSelector(selectRegistersExpense);
  const getRegistersFilteredExpense = useAppSelector(
    selectRegistersFilteredExpense
  );

  const getRegistersFilterInvestment = useAppSelector(
    selectRegistersFilterInvestment
  );
  const getRegistersInvestment = useAppSelector(selectRegistersInvestment);
  const getRegistersFilteredInvestment = useAppSelector(
    selectRegistersFilteredInvestment
  );

  // Define a mapping of props.type to selectors
  const selectorMapping: any = {
    entry: {
      filter: getRegistersFilterEntry,
      registers: getRegistersEntry,
      filtered: getRegistersFilteredEntry,
    },
    expense: {
      filter: getRegistersFilterExpense,
      registers: getRegistersExpense,
      filtered: getRegistersFilteredExpense,
    },
    investment: {
      filter: getRegistersFilterInvestment,
      registers: getRegistersInvestment,
      filtered: getRegistersFilteredInvestment,
    },
  };

  // Select the appropriate selectors based on props.type
  const selectedSelectors = selectorMapping[props.type];

  // Use the selected selectors with useAppSelector
  const getRegistersFilter = selectedSelectors ? selectedSelectors.filter : {};
  const getRegisters = selectedSelectors ? selectedSelectors.registers : [];
  const getRegistersFiltered = selectedSelectors
    ? selectedSelectors.filtered
    : [];

  return (
    <View
      testID={props.testID}
      className={`flex items-center justify-center ${utils.isObjectEmpty(getRegistersFiltered) ? "flex-col" : "flex-row"
        }`}
    >
      {
        <BalanceTotal
          type={String(props.type)}
          filter={getRegistersFilter}
          filtered={getRegistersFiltered}
          onPress={() => dispatch(setModalInfo(props.type))}
        />
      }
      {getRegisters.length > 1 && (
        <Button
          twClass="bg-gray-100 dark:bg-zinc-900 p-3 pr-4 mx-4 rounded-full absolute right-0"
          text={t("filter.btn")}
          label={t("filter.btn_label")}
          textColor="text-black dark:text-white ml-2"
          onPress={() => dispatch(setModalFilter(props.type))}
          icon={
            <>
              {utils.isObjectEmpty(getRegistersFilter) ? (
                <MaterialIcons
                  name="filter-list"
                  size={30}
                  color={colorScheme === "dark" ? "white" : "black"}
                />
              ) : (
                <Text className="scale-[1] text-xs bg-black dark:bg-white font-bold text-white dark:text-black px-2 py-1 rounded-full">
                  {utils.getFilledItemsCount(getRegistersFilter)}
                </Text>
              )}
            </>
          }
        ></Button>
      )}
    </View>
  );
}
