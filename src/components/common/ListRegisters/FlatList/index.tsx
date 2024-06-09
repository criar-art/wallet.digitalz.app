import { FlatList, View } from "react-native";
import { useState } from "react";
import ItemList from "@components/common/ListRegisters/Item";
import EmptyRegisters from "@components/common/ListRegisters/Empty";
import useIsTablet from "@hooks/useIsTablet";
import useOrientation from "@hooks/useOrientation";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { setRegisterData } from "@store/commonSlice";
import { RootState } from "@store";
import {
  setModalRegister,
  setModalDelete,
  setModalPay,
} from "@store/modalsSlice";
import { Props, SelectorMapping } from "./types";

import {
  selectRegistersFilteredEntry,
  selectRegistersFilteredExpense,
  selectRegistersFilteredInvestment,
} from "@store/commonSelects";

const FlatListRegisters = (props: Props) => {
  const { landscape } = useOrientation();
  const isTablet = useIsTablet();
  const dispatch = useAppDispatch();
  const common = useAppSelector((state: RootState) => state.commonState);
  const [optionsShow, setOptionsShow] = useState(null);

  const getRegistersFilteredEntry = useAppSelector(
    selectRegistersFilteredEntry
  );
  const getRegistersFilteredExpense = useAppSelector(
    selectRegistersFilteredExpense
  );

  const getRegistersFilteredInvestment = useAppSelector(
    selectRegistersFilteredInvestment
  );

  // Define a mapping of props.type to selectors
  const selectorMapping: SelectorMapping = {
    entry: {
      filtered: getRegistersFilteredEntry,
    },
    expense: {
      filtered: getRegistersFilteredExpense,
    },
    investment: {
      filtered: getRegistersFilteredInvestment,
    },
  };

  // Select the appropriate selectors based on props.type
  const selectedSelectors = selectorMapping[props.type];

  // Use the selected selectors with useAppSelector
  const getRegistersFiltered = selectedSelectors
    ? selectedSelectors.filtered
    : [];

  function edit(target: any) {
    dispatch(setModalRegister("edit"));
    dispatch(setRegisterData({ ...target }));
  }

  function remove(target: any) {
    dispatch(setModalDelete({ id: target.id, type: target.type }));
  }

  function handlePay(target: any) {
    dispatch(setModalPay(target));
  }

  function handlePressOptionsShow(id: any) {
    setOptionsShow((prevActiveItem: any) =>
      prevActiveItem === id ? null : id
    );
  }

  const isOdd = getRegistersFiltered?.length % 2 !== 0;

  return (
    <FlatList
      testID={props.testID}
      data={getRegistersFiltered}
      numColumns={props.numColumns}
      renderItem={({ item, index }) => {
        const isLastItem = isOdd && index === getRegistersFiltered?.length - 1;
        return (
          <View
            className={[
              "flex",
              landscape || isTablet ? "w-1/2" : "w-full",
              (landscape || isTablet) && isLastItem ? "w-1/2" : "",
            ].join(" ")}
          >
            <ItemList
              key={item.id}
              item={item}
              eyeStatus={common.eyeStatus}
              edit={() => edit(item)}
              remove={() => remove(item)}
              handlePay={() => handlePay(item)}
              optionsShow={optionsShow}
              setOptionsShow={setOptionsShow}
              handlePressOptionsShow={handlePressOptionsShow}
            />
          </View>
        );
      }}
      keyExtractor={props.keyExtractor}
      key={props.keyProp}
      contentContainerStyle={{
        paddingBottom: landscape || isTablet ? 100 : 130,
      }}
      columnWrapperStyle={props.columnWrapperStyle}
      ListEmptyComponent={
        props.isNotEmpetyRegisters() ? (
          <EmptyRegisters
            filtered={Boolean(getRegistersFiltered.length == 0)}
            type={props.type}
          />
        ) : null
      }
    />
  );
};

export default FlatListRegisters;
