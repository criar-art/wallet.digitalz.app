import { useSelector } from "react-redux";
import useIsTablet from "@hooks/useIsTablet";
import useOrientation from "@hooks/useOrientation";
import { selectRegistersType } from "@store/commonSelects";
import FadeView from "@components/animation/FadeView";
import EmptyRegisters from "@components/common/ListRegisters/Empty";
import FlatListRegisters from "./FlatList";
import Header from "./Header";
import { Props } from "./types";

export default function ListRegisters(props: Props) {
  const { orientation } = useOrientation();
  const isTablet = useIsTablet();
  const getRegisters = useSelector(selectRegistersType(props.type));
  const isNotEmpetyRegisters = (): boolean => Boolean(getRegisters.length);

  return (
    <FadeView testID="list-register">
      {isNotEmpetyRegisters() ? (
        <>
          <Header type={props.type} />
          {(orientation === 1 || orientation === 2) && !isTablet ? (
            <FlatListRegisters
              keyProp="flatlist-registers-1"
              keyExtractor={(item: any) => "_" + item.id}
              type={props.type}
              numColumns={1}
              isNotEmpetyRegisters={isNotEmpetyRegisters}
            />
          ) : (
            <FlatListRegisters
              keyProp="flatlist-registers-2"
              keyExtractor={(item: any) => "#" + item.id}
              type={props.type}
              numColumns={2}
              columnWrapperStyle={{
                flex: 1,
                flexWrap: "wrap",
                paddingLeft: 15,
                paddingRight: 15,
              }}
              isNotEmpetyRegisters={isNotEmpetyRegisters}
            />
          )}
        </>
      ) : (
        <EmptyRegisters />
      )}
    </FadeView>
  );
}
