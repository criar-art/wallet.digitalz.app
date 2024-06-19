import { View, ScrollView } from "react-native";
import useOrientation from "@hooks/useOrientation";
import useIsTablet from "@hooks/useIsTablet";
import { useBalance } from "@hooks/useBalance";
import FadeView from "@components/animation/FadeView";
import ItemList from "@components/common/PanelsRegisters/Item";
import { setModalInfo } from "@store/modalsSlice";
import { useAppDispatch } from "@store/hooks";
import { Props } from "./types";
import BalanceTotal from "../BalanceTotal";
import Summary from "./Summary";

export default function PanelsRegisters(props: Props) {
  const dispatch = useAppDispatch();
  const { landscape } = useOrientation();
  const isTablet = useIsTablet();
  const { getTotal, getLiquid } = useBalance();

  const listData = [
    { type: "liquid", value: getLiquid(), isVisible: true },
    { type: "expense", value: getTotal("expense"), isVisible: true },
    { type: "entry", value: getTotal("entry"), isVisible: true },
    { type: "investment", value: getTotal("investment"), isVisible: true },
  ];

  return (
    <FadeView
      testID={props.testID || "panels-registers"}
      twClass="flex flex-col h-full"
    >
      {!landscape && !isTablet && (
        <BalanceTotal
          type="patrimony"
          onPress={() => dispatch(setModalInfo("patrimony"))}
        />
      )}
      <ScrollView
        className="flex"
        contentContainerStyle={{
          paddingBottom: landscape || isTablet ? 100 : 40,
        }}
      >
        <View
          className="flex flex-row flex-wrap justify-center pt-1"
          style={{
            paddingLeft: landscape || isTablet ? 15 : 0,
            paddingRight: landscape || isTablet ? 15 : 0,
          }}
        >
          {listData.map(
            item => item.isVisible && (
              <View
                key={item.type}
                className={`text-center ${landscape || isTablet ? "w-1/2" : "w-full"}`}
              >
                <ItemList type={item.type} value={item.value} />
              </View>
            )
          )}
        </View>
        {(getTotal("expense") || getTotal("entry") || getTotal("investment")) && (
          <Summary />
        )}
      </ScrollView>
    </FadeView>
  );
}
