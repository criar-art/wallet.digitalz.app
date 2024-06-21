import { ScrollView, View } from "react-native";
import PanelsRegisters from "@components/common/PanelsRegisters";
import useIsTablet from "@hooks/useIsTablet";
import useOrientation from "@hooks/useOrientation";
import BalanceTotal from "@components/common/BalanceTotal";
import { useAppDispatch } from "@store/hooks";
import { setModalInfo } from "@store/modalsSlice";
import { useBalance } from "@hooks/useBalance";
import Summary from "@components/common/Summary";
import useScrollMenuVisible from "@hooks/useScrollMenuVisible";
// import DevTest from "@components/beta/DevTest";

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const { landscape } = useOrientation();
  const isTablet = useIsTablet();
  const { getTotal, getLiquid } = useBalance();
  const { handleScroll } = useScrollMenuVisible();

  const panelsData = [
    { type: "liquid", value: getLiquid() },
    { type: "expense", value: getTotal("expense") },
    { type: "entry", value: getTotal("entry") },
    { type: "investment", value: getTotal("investment") },
  ];

  const showSummary = !!(
    getTotal("expense") ||
    getTotal("entry") ||
    getTotal("investment")
  );

  return (
    <View testID="home-screen" className="flex-1 justify-between flex-col">
      {!landscape && !isTablet && (
        <BalanceTotal
          type="patrimony"
          onPress={() => dispatch(setModalInfo("patrimony"))}
        />
      )}
      <ScrollView
        className="flex flex-1"
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingBottom: 10,
        }}
      >
        {/* <DevTest /> */}
        <PanelsRegisters list={panelsData} />
        {showSummary && <Summary />}
      </ScrollView>
    </View>
  );
}
