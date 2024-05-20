import { View, ScrollView } from "react-native";
import useOrientation from "../../hooks/useOrientation";
import { useBalance } from "../../hooks/useBalance";
import FadeView from "../FadeView";
import ItemList from "./Item";
import { Props } from "./types";

export default function PanelsRegisters(props: Props) {
  const { landscape, portrait } = useOrientation();
  const { getTotal, getPatrimonyTotal, getLiquid } = useBalance();

  return (
    <FadeView testID="panels-registers">
      <ScrollView
        className="p-4"
        contentContainerStyle={{
          paddingBottom: landscape ? 80 : 20,
          paddingTop: landscape ? 15 : 4,
        }}
      >
        <View className="flex flex-row flex-wrap">
          {portrait && (
            <ItemList type="patrimony" value={getPatrimonyTotal()} />
          )}
          <ItemList type="liquid" value={getLiquid()} />
          <ItemList type="expense" value={getTotal("expense")} />
          <ItemList type="entry" value={getTotal("entry")} />
          <ItemList type="investiment" value={getTotal("investiment")} />
        </View>
      </ScrollView>
    </FadeView>
  );
}
