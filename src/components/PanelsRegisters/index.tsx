import { View, ScrollView } from "react-native";
import useOrientation from "@hooks/useOrientation";
import { useBalance } from "@hooks/useBalance";
import FadeView from "@components/FadeView";
import ItemList from "@components/PanelsRegisters/Item";
import TotalCategory from "@components/TotalCategory";
import { setModalInfo } from "@store/modalsSlice";
import { useAppDispatch } from "@store/hooks";
import { Props } from "./types";

export default function PanelsRegisters(props: Props) {
  const dispatch = useAppDispatch();
  const { landscape } = useOrientation();
  const { getTotal, getLiquid } = useBalance();

  const listData = [
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
        }}
      >
        <View>
          {!landscape && (
            <TotalCategory
              type="patrimony"
              onPress={() => dispatch(setModalInfo("patrimony"))}
            />
          )}
          <View
            className="flex flex-row flex-wrap justify-center pt-1"
            style={{
              paddingLeft: landscape ? 15 : 0,
              paddingRight: landscape ? 15 : 0,
            }}
          >
            {listData.map(
              (item: any) =>
                item.isVisible && (
                  <View
                    key={item.type}
                    className={`text-center ${landscape ? "w-1/2" : " w-full"}`}
                  >
                    <ItemList type={item.type} value={item.value} />
                  </View>
                )
            )}
          </View>
        </View>
      </ScrollView>
    </FadeView>
  );
}
