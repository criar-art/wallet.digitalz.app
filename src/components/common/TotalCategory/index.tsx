import { TouchableOpacity } from "react-native";
import ItemTotal from "./ItemTotal";
import { useAppSelector } from "@store/hooks";
import { useBalance } from "@hooks/useBalance";
import { RootState } from "@store";
import { Props } from "./types";
import { isObjectEmpty } from "@utils";
import { useSelector } from "react-redux";
import { selectRegistersFiltered } from "@store/commonSlice";

export default function TotalCategory(props: Props) {
  const common = useAppSelector((state: RootState) => state.commonState);
  const getRegistersFiltered = useSelector(selectRegistersFiltered(props.type));
  const { getTotal, getPatrimonyTotal, getFilteredTotal } = useBalance();
  const isFilterEmpty = isObjectEmpty(common.registerFilter);
  const getTotalValue = (): number =>
    props.type === "patrimony" ? getPatrimonyTotal() : getTotal(props.type);

  const returnTotalValue = (): number => {
    if (isFilterEmpty) {
      return getTotalValue();
    }
    if (getRegistersFiltered) {
      return getFilteredTotal(getRegistersFiltered);
    }
    return getTotalValue();
  };

  return (
    <TouchableOpacity
      testID="total-category"
      className={props.twClass}
      onPress={props.onPress}
    >
      <ItemTotal
        type={props.type}
        isFilterEmpty={isFilterEmpty}
        value={returnTotalValue()}
        eyeStatus={common.eyeStatus}
      />
    </TouchableOpacity>
  );
}
