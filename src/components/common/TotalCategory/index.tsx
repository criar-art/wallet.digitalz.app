import { TouchableOpacity } from "react-native";
import ItemTotal from "./ItemTotal";
import { useAppSelector } from "@store/hooks";
import { useBalance } from "@hooks/useBalance";
import { RootState } from "@store";
import { Props } from "./types";

export default function TotalCategory(props: Props) {
  const common = useAppSelector((state: RootState) => state.commonState);
  const { getTotal, getPatrimonyTotal } = useBalance();

  return (
    <TouchableOpacity
      testID="total-category"
      className={props.twClass}
      onPress={props.onPress}
    >
      <ItemTotal
        type={props.type}
        value={
          props.type === "patrimony"
            ? getPatrimonyTotal()
            : getTotal(props.type)
        }
        eyeStatus={common.eyeStatus}
      />
    </TouchableOpacity>
  );
}
