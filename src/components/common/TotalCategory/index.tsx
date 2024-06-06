import { memo, useMemo, useCallback } from "react";
import { TouchableOpacity } from "react-native";
import ItemTotal from "./ItemTotal";
import { useAppSelector } from "@store/hooks";
import { useBalance } from "@hooks/useBalance";
import { RootState } from "@store";
import { Props } from "./types";
import utils from "@utils";
import { useSelector } from "react-redux";
import { selectRegistersFiltered, selectFilters } from "@store/commonSelects";

function TotalCategory(props: Props) {
  const common = useAppSelector((state: RootState) => state.commonState);
  const getRegistersFilter = useSelector(selectFilters(String(props.type)));
  const getRegistersFiltered = useSelector(selectRegistersFiltered(props.type));
  const { getTotal, getPatrimonyTotal, getFilteredTotal } = useBalance();

  const isFilterEmpty = useMemo(
    () => utils.isObjectEmpty(getRegistersFilter),
    [getRegistersFilter]
  );

  const getTotalValue = useCallback((): number => {
    return props.type === "patrimony"
      ? getPatrimonyTotal()
      : getTotal(props.type);
  }, [getPatrimonyTotal, getTotal, props.type]);

  const returnTotalValue = useMemo((): number => {
    if (isFilterEmpty) {
      return getTotalValue();
    }
    if (getRegistersFiltered) {
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
