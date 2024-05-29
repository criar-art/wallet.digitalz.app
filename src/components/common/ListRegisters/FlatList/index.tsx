import { FlatList, View } from "react-native";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigationState } from "@react-navigation/native";
import ItemList from "@components/common/ListRegisters/Item";
import EmptyRegisters from "@components/common/ListRegisters/Empty";
import useIsTablet from "@hooks/useIsTablet";
import useOrientation from "@hooks/useOrientation";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import {
  setRegisterData,
  setResetFilter,
  selectRegistersFiltered,
} from "@store/commonSlice";
import { RootState } from "@store";
import {
  setModalRegister,
  setModalDelete,
  setModalPay,
} from "@store/modalsSlice";
import { Props } from "./types";

const FlatListRegisters = (props: Props) => {
  const navigationState = useNavigationState((state) => state);
  const { landscape } = useOrientation();
  const isTablet = useIsTablet();
  const dispatch = useAppDispatch();
  const common = useAppSelector((state: RootState) => state.commonState);
  const getRegistersFiltered = useSelector(selectRegistersFiltered(props.type));
  const [optionsShow, setOptionsShow] = useState(null);

  useEffect(() => {
    dispatch(
      setResetFilter({
        short: "",
        startDate: "",
        endDate: "",
        searchTerm: "",
        pay: undefined,
      })
    );
  }, [navigationState]);

  function edit(target: any) {
    dispatch(setModalRegister("edit"));
    dispatch(setRegisterData({ ...target }));
  }

  function remove(target: string) {
    dispatch(setModalDelete(target));
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
              remove={() => remove(item.id)}
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
          />
        ) : null
      }
    />
  );
};

export default FlatListRegisters;
