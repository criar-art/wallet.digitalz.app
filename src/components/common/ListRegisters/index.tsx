import useIsTablet from "@hooks/useIsTablet";
import useOrientation from "@hooks/useOrientation";
import FadeView from "@components/animation/FadeView";
import EmptyRegisters from "@components/common/ListRegisters/Empty";
import FlatListRegisters from "./FlatList";
import Header from "./Header";
import { Props } from "./types";
import { useAppSelector } from "@store/hooks";

import {
  selectRegistersEntry,
  selectRegistersExpense,
  selectRegistersInvestment,
} from "@store/commonSelects";

export default function ListRegisters(props: Props) {
  const { orientation, portrait } = useOrientation();
  const isTablet = useIsTablet();

  const getRegistersEntry = useAppSelector(selectRegistersEntry);
  const getRegistersExpense = useAppSelector(selectRegistersExpense);
  const getRegistersInvestment = useAppSelector(selectRegistersInvestment);

  // Define a mapping of props.type to selectors
  const selectorMapping: any = {
    entry: {
      registers: getRegistersEntry || [],
    },
    expense: {
      registers: getRegistersExpense || [],
    },
    investment: {
      registers: getRegistersInvestment || [],
    },
  };

  // Select the appropriate selectors based on props.type
  const selectedSelectors = selectorMapping[props.type];

  // Use the selected selectors with useAppSelector
  const getRegisters = selectedSelectors ? selectedSelectors.registers : [];

  const isNotEmpetyRegisters = (): boolean => Boolean(getRegisters.length);

  return (
    <FadeView testID="list-register">
      {isNotEmpetyRegisters() ? ((orientation === 1 || orientation === 2) && !isTablet ? (
        <>
          <Header type={props.type} />
          <FlatListRegisters
            keyProp="flatlist-registers-1"
            keyExtractor={(item: any) => "_" + item.id}
            type={props.type}
            numColumns={1}
            isNotEmpetyRegisters={isNotEmpetyRegisters}
          />
        </>
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
      )) : (
        <EmptyRegisters />
      )}
    </FadeView>
  );
}
