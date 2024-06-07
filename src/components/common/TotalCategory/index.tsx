import { memo, useMemo, useCallback } from "react";
import { TouchableOpacity } from "react-native";
import ItemTotal from "./ItemTotal";
import { useAppSelector } from "@store/hooks";
import { useBalance } from "@hooks/useBalance";
import { RootState } from "@store";
import { Props } from "./types";
import utils from "@utils";

import {
  selectRegistersFilterEntry,
  selectRegistersFilterExpense,
  selectRegistersFilterInvestment,
  selectRegistersFilteredEntry,
  selectRegistersFilteredExpense,
  selectRegistersFilteredInvestment,
} from "@store/commonSelects";

function TotalCategory(props: Props) {
  const common = useAppSelector((state: RootState) => state.commonState);
  const { getTotal, getPatrimonyTotal, getFilteredTotal } = useBalance();

  const getRegistersFilterEntry = useAppSelector(selectRegistersFilterEntry);
  const getRegistersFilteredEntry = useAppSelector(
    selectRegistersFilteredEntry
  );

  const getRegistersFilterExpense = useAppSelector(
    selectRegistersFilterExpense
  );
  const getRegistersFilteredExpense = useAppSelector(
    selectRegistersFilteredExpense
  );

  const getRegistersFilterInvestment = useAppSelector(
    selectRegistersFilterInvestment
  );
  const getRegistersFilteredInvestment = useAppSelector(
    selectRegistersFilteredInvestment
  );

  // Define a mapping of props.type to selectors
  const selectorMapping: any = {
    entry: {
      filter: getRegistersFilterEntry,
      filtered: getRegistersFilteredEntry,
    },
    expense: {
      filter: getRegistersFilterExpense,
      filtered: getRegistersFilteredExpense,
    },
    investment: {
      filter: getRegistersFilterInvestment,
      filtered: getRegistersFilteredInvestment,
    },
    patrimony: {
      filter: getRegistersFilterInvestment,
      filtered: getRegistersFilteredInvestment,
    },
  };

  // Select the appropriate selectors based on props.type
  const selectedSelectors = selectorMapping[props.type];

  // Use the selected selectors with useAppSelector
  const getRegistersFilter = selectedSelectors.filter;
  const getRegistersFiltered = selectedSelectors.filtered;

  const isFilterEmpty = useMemo(
    () =>
      props.type !== "patrimony"
        ? utils.isObjectEmpty(getRegistersFilter)
        : true,
    [getRegistersFilter]
  );

  const getTotalValue = useCallback((): number => {
    return props.type === "patrimony"
      ? getPatrimonyTotal()
      : getTotal(props.type);
  }, [getPatrimonyTotal, getTotal, props.type]);

  const returnTotalValue = useMemo((): number => {
    if (getRegistersFiltered && props.type !== "patrimony" && !isFilterEmpty) {
      return getFilteredTotal(getRegistersFiltered);
    }
    return getTotalValue();
  }, [isFilterEmpty, getTotalValue, getRegistersFiltered, getFilteredTotal]);

  return (
    <TouchableOpacity
      testID="total-category"
      className={props.twClass}
      onPress={props.onPress}
    >
      <ItemTotal
        type={props.type}
        isFilterEmpty={isFilterEmpty}
        value={returnTotalValue}
        eyeStatus={common.eyeStatus}
      />
    </TouchableOpacity>
  );
}

export default memo(TotalCategory);
