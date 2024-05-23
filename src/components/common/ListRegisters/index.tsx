import { FlatList, StyleProp, View, ViewStyle } from "react-native";
import { compareDesc, parse } from "date-fns";
import FadeView from "@components/animation/FadeView";
import ItemList from "@components/common/ListRegisters/Item";
import TotalCategory from "@components/common/TotalCategory";
import EmptyRegisters from "@components/common/ListRegisters/Empty";
import useIsTablet from "@hooks/useIsTablet";
import useOrientation from "@hooks/useOrientation";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { setEditRegister, setRegisterData } from "@store/commonSlice";
import { RootState } from "@store";
import {
  setModalRegister,
  setModalDelete,
  setModalInfo,
} from "@store/modalsSlice";
import { Props } from "./types";

export default function ListRegisters(props: Props) {
  const { orientation, landscape, portrait } = useOrientation();
  const isTablet = useIsTablet();
  const dispatch = useAppDispatch();
  const common = useAppSelector((state: RootState) => state.commonState);

  function edit(target: any) {
    dispatch(setModalRegister("edit"));
    dispatch(setRegisterData({ ...target }));
  }

  function remove(target: string) {
    dispatch(setModalDelete(target));
  }

  function handlePay(item: any) {
    const updatedItem = { ...item, pay: true }; // Marcando o item como pago
    dispatch(setEditRegister(updatedItem)); // Enviando o item modificado para a store
  }

  const filteredData = common.registers.filter(
    (item: any) => item.type == props.type
  );
  const isOdd = filteredData.length % 2 !== 0;

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

  const filteredAndSortedData = common.registers
    .filter((item) => item.type === props.type)
    .sort((a, b) => {
      const dateA = parse(a.date, "dd/MM/yyyy", new Date());
      const dateB = parse(b.date, "dd/MM/yyyy", new Date());
      return compareDesc(dateA, dateB);
    });

  return (
    <FadeView testID="list-register">
      {common.registers.filter((item: any) => item.type == props.type)
        .length ? (
        <FlatList
          data={filteredAndSortedData}
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
                />
              </View>
            );
          }}
          keyExtractor={(item) => item.id}
          key={orientation}
          contentContainerStyle={{
            paddingBottom: landscape || isTablet ? 100 : 40,
          }}
          columnWrapperStyle={columnWrapperStyle}
          ListHeaderComponent={() =>
            portrait && (
              <TotalCategory
                type={props.type}
                onPress={() => dispatch(setModalInfo(props.type))}
              />
            )
          }
          stickyHeaderIndices={[0]}
        />
      ) : (
        <EmptyRegisters />
      )}
    </FadeView>
  );
}
