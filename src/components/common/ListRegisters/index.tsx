import { FlatList, StyleProp, View, ViewStyle } from "react-native";
import FadeView from "@components/animation/FadeView";
import ItemList from "@components/common/ListRegisters/Item";
import EmptyRegisters from "@components/common/ListRegisters/Empty";
import useIsTablet from "@hooks/useIsTablet";
import useOrientation from "@hooks/useOrientation";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import {
  setEditRegister,
  setRegisterData,
  selectRegistersType,
  setResetFilter,
} from "@store/commonSlice";
import { RootState } from "@store";
import { setModalRegister, setModalDelete } from "@store/modalsSlice";
import Header from "./Header";
import { Props } from "./types";
import useFilteredData from "@hooks/useFilteredData";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigationState } from "@react-navigation/native";

export default function ListRegisters(props: Props) {
  const navigationState = useNavigationState((state) => state);
  const { orientation, landscape } = useOrientation();
  const isTablet = useIsTablet();
  const dispatch = useAppDispatch();
  const common = useAppSelector((state: RootState) => state.commonState);
  const getRegisters = useSelector(selectRegistersType(props.type));
  const [optionsShow, setOptionsShow] = useState(null);
  const { filteredData } = useFilteredData({
    type: props.type,
  });

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

  function handlePressOptionsShow(id: any) {
    setOptionsShow((prevActiveItem: any) =>
      prevActiveItem === id ? null : id
    );
  }

  function handlePay(item: any) {
    const updatedItem = { ...item, pay: true }; // Marcando o item como pago
    dispatch(setEditRegister(updatedItem)); // Enviando o item modificado para a store
  }

  const isOdd = filteredData.length % 2 !== 0;

  const isNotEmpetyRegisters = () => getRegisters.length;

  const numColumns =
    (orientation === 1 || orientation === 2) && !isTablet ? 1 : 2;

  const columnWrapperStyle: StyleProp<ViewStyle> | null =
    isTablet || (orientation !== 1 && orientation !== 2)
      ? {
          flex: 1,
          flexWrap: "wrap",
          paddingLeft: 15,
          paddingRight: 15,
        }
      : null;

  return (
    <FadeView testID="list-register">
      {isNotEmpetyRegisters() ? (
        <>
          <Header type={props.type} />
          <FlatList
            data={filteredData}
            numColumns={numColumns}
            renderItem={({ item, index }: any) => {
              const isLastItem = isOdd && index === filteredData.length - 1;
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
            keyExtractor={(item) => item.id}
            key={orientation}
            contentContainerStyle={{
              paddingBottom: landscape || isTablet ? 100 : 130,
            }}
            columnWrapperStyle={columnWrapperStyle}
            ListEmptyComponent={
              isNotEmpetyRegisters() ? (
                <EmptyRegisters filtered={Boolean(filteredData.length == 0)} />
              ) : null
            }
          />
        </>
      ) : (
        <EmptyRegisters />
      )}
    </FadeView>
  );
}
