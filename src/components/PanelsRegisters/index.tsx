import { View, ScrollView, Text } from "react-native";
import useOrientation from "../../hooks/useOrientation";
import { useBalance } from "../../hooks/useBalance";
import FadeView from "../FadeView";
import ItemList from "./Item";
import { Props } from "./types";

export default function PanelsRegisters(props: Props) {
  const { landscape } = useOrientation();
  const { getTotal, getPatrimonyTotal, getLiquid } = useBalance();

  const listData = [
    { type: "patrimony", value: getPatrimonyTotal(), isVisible: !landscape },
    { type: "liquid", value: getLiquid(), isVisible: true },
    { type: "expense", value: getTotal("expense"), isVisible: true },
    { type: "entry", value: getTotal("entry"), isVisible: true },
    { type: "investiment", value: getTotal("investiment"), isVisible: true },
  ];

  return (
    <FadeView testID={props.testID ? props.testID : "panels-registers"}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: landscape ? 80 : 20,
          paddingTop: landscape ? 30 : 20,
          paddingHorizontal: landscape ? 27 : 20
        }}
      >
        <View className="flex flex-row flex-wrap gap-6 justify-center">
          {listData.map(
            (item: any) =>
              item.isVisible && (
                <View
                  key={item.type}
                  className="flex-1 text-center min-w-[400]"
                >
                  <ItemList type={item.type} value={item.value} />
                </View>
              )
          )}
        </View>
      </ScrollView>
    </FadeView>
  );
}
