import { View } from "react-native";
import useOrientation from "@hooks/useOrientation";
import useIsTablet from "@hooks/useIsTablet";
import FadeView from "@components/animation/FadeView";
import ItemList from "@components/common/PanelsRegisters/Item";
import { ItemPanel, Props } from "./types";

export default function PanelsRegisters(props: Props) {
  const { landscape } = useOrientation();
  const isTablet = useIsTablet();

  return (
    <FadeView
      testID={props.testID || "panels-registers"}
      twClass="flex flex-col"
    >
      <View
        className="flex flex-row flex-wrap justify-center pt-1"
        style={{
          paddingLeft: landscape || isTablet ? 15 : 0,
          paddingRight: landscape || isTablet ? 15 : 0,
        }}
      >
        {props.list.map((item: ItemPanel) => (
          <View
            key={item.type}
            className={`text-center ${
              landscape || isTablet ? "w-1/2" : "w-full"
            }`}
          >
            <ItemList type={item.type} value={item.value} />
          </View>
        ))}
      </View>
    </FadeView>
  );
}
