import { useState } from "react";
import { View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import ItemList from "@components/common/ListRegisters/Item";
import EmptyRegisters from "@components/common/ListRegisters/Empty";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { setRegisterData } from "@store/commonSlice";
import { RootState } from "@store";
import {
  setModalRegister,
  setModalDelete,
  setModalPay,
  setModalDuplicate,
} from "@store/modalsSlice";
import {
  selectRegistersFilteredEntry,
  selectRegistersFilteredExpense,
  selectRegistersFilteredInvestment,
} from "@store/commonSelects";
import useScrollMenuVisible from "@hooks/useScrollMenuVisible";
import { Props, SelectorMapping } from "./types";

const FlatListRegisters = (props: Props) => {
  const dispatch = useAppDispatch();
  const common = useAppSelector((state: RootState) => state.commonState);
  const [optionsShow, setOptionsShow] = useState(null);
  const { handleScroll } = useScrollMenuVisible();

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

  function duplicate(target: any) {
    dispatch(setModalDuplicate({ ...target }));
  }

  function handlePay(target: any) {
    dispatch(setModalPay(target));
  }

  function handlePressOptionsShow(id: any) {
    setOptionsShow((prevActiveItem: any) =>
      prevActiveItem === id ? null : id
    );
  }

  return (
    <FlashList
      testID={props.testID}
      data={getRegistersFiltered}
      extraData={[common.eyeStatus, optionsShow]}
      numColumns={props.numColumns}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      renderItem={({ item }) => {
        return (
          <View className="flex flex-1 p-2">
            <ItemList
              key={item.id}
              item={item}
              eyeStatus={common.eyeStatus}
              edit={() => edit(item)}
              remove={() => remove(item)}
              duplicate={() => duplicate(item)}
              handlePay={() => handlePay(item)}
              optionsShow={optionsShow}
              setOptionsShow={setOptionsShow}
              handlePressOptionsShow={handlePressOptionsShow}
            />
          </View>
        );
      }}
      estimatedItemSize={100}
      keyExtractor={props.keyExtractor}
      key={props.keyProp}
      contentContainerStyle={{
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 10,
      }}
      scrollEnabled={!!getRegistersFiltered?.length}
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
