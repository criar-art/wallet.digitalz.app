import { useRef } from "react";
import { View } from "react-native";
import { parse } from "date-fns";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { useColorScheme } from "nativewind";
import { RootState } from "@store";
import { setModalFilter } from "@store/modalsSlice";
import Modal from "@components/common/Modal";
import { ModalHandle } from "@components/common/Modal/types";
import Button from "@components/common/Button";
import { setRegisterFilter, setResetFilter } from "@store/commonSlice";
import InputDate from "@components/common/Form/InputDate";
import { Props } from "./types";

export default function ModalFilter(props: Props) {
  const { colorScheme } = useColorScheme();
  const dispatch = useAppDispatch();
  const modals = useAppSelector((state: RootState) => state.modalsState);
  const common = useAppSelector((state: RootState) => state.commonState);
  const modalRef = useRef<ModalHandle>(null);
  const isOpenModal = (): boolean =>
    ["expense", "entry", "investiment"].includes(modals?.modalFilter);
  const startDate = common.registerFilter?.startDate
    ? parse(common.registerFilter.startDate, "dd/MM/yyyy", new Date())
    : null;
  const endDate = common.registerFilter?.endDate
    ? parse(common.registerFilter.endDate, "dd/MM/yyyy", new Date())
    : null;

  const resetFilters = () => {
    if (
      common.registerFilter?.short ||
      common.registerFilter?.endDate ||
      common.registerFilter?.startDate ||
      common.registerFilter?.searchTerm ||
      common.registerFilter?.pay !== undefined
    ) {
      dispatch(
        setResetFilter({
          short: "",
          startDate: "",
          endDate: "",
          searchTerm: "",
          pay: undefined,
        })
      );
    } else {
      modalRef.current?.closeModal();
    }
  };

  return (
    <Modal
      ref={modalRef}
      optional={true}
      isOpen={isOpenModal()}
      testID={props.testID ? props.testID : "teste-modal"}
      closeAction={() => dispatch(setModalFilter(""))}
      cancelAction={resetFilters}
      confirmAction={() => modalRef.current?.closeModal()}
      header={{
        title: "Filtro",
        icon: (
          <MaterialIcons
            name="filter-list"
            size={28}
            color={colorScheme === "dark" ? "white" : "#aaa"}
          />
        ),
      }}
      cancelButton={{
        text: "Limpar",
        label: "Limpar todos os filtros",
        icon: (
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={28}
            color="white"
          />
        ),
      }}
      confirmButton={{
        text: "Aplicar",
        label: "Ok fechar o modal de filtro",
        icon: <MaterialIcons name="check" size={28} color="white" />,
      }}
    >
      <View className="mb-6 pt-4">
        {/* <View className="flex flex-row mt-4">
          <Button
            className="border-2 border-slate-600 dark:border-zinc-500 p-3 h-14 flex-1 mr-2 py-2"
            text="Crescente"
            label="test"
            textColor="text-black dark:text-white"
            onPress={() => dispatch(setRegisterFilter({ short: "asc" }))}
            icon={
              <FontAwesome6
                name="arrow-up-wide-short"
                size={26}
                color={colorScheme === "dark" ? "white" : "black"}
              />
            }
          />
          <Button
            className="border-2 border-slate-600 dark:border-zinc-500 p-3 h-14 flex-1 ml-2 py-2"
            text="Decrescente"
            label="test"
            textColor="text-black dark:text-white"
            onPress={() => dispatch(setRegisterFilter({ short: "desc" }))}
            icon={
              <FontAwesome6
                name="arrow-down-wide-short"
                size={26}
                color={colorScheme === "dark" ? "white" : "black"}
              />
            }
          />
        </View> */}
        {modals?.modalFilter == "expense" && (
          <View className="flex flex-row mb-4">
            <Button
              twClass={`border-2 border-slate-600 dark:border-zinc-500 p-3 h-14 bg-white dark:bg-zinc-800 mr-1 w-20 ${
                common.registerFilter?.pay == undefined
                  ? "bg-gray-200 dark:bg-zinc-500"
                  : ""
              }`}
              text="Todos"
              label="Filtro de registros"
              textColor="text-black dark:text-white text-xs"
              onPress={() =>
                common.registerFilter?.pay !== undefined
                  ? dispatch(setRegisterFilter({ pay: undefined }))
                  : null
              }
            />
            <Button
              twClass={`border-2 border-slate-600 dark:border-zinc-500 p-3 h-14 bg-white dark:bg-zinc-800 mx-3 flex-1 ${
                common.registerFilter?.pay ? "bg-gray-200 dark:bg-zinc-500" : ""
              }`}
              text="Pagos"
              label="Filtro de registros"
              textColor="ml-1 text-black dark:text-white text-xs"
              onPress={() =>
                common.registerFilter?.pay !== true
                  ? dispatch(setRegisterFilter({ pay: true }))
                  : null
              }
              icon={
                <MaterialIcons
                  name="attach-money"
                  size={26}
                  color={colorScheme === "dark" ? "white" : "black"}
                />
              }
            />
            <Button
              twClass={`border-2 border-slate-600 dark:border-zinc-500 p-3 h-14 bg-white dark:bg-zinc-800 ml-1 flex-1 flex-1 ${
                common.registerFilter?.pay == false
                  ? "bg-gray-200 dark:bg-zinc-500"
                  : ""
              }`}
              text="Não Pagos"
              label="Filtro de registros"
              textColor="ml-1 text-black dark:text-white text-xs"
              onPress={() =>
                common.registerFilter?.pay !== false
                  ? dispatch(setRegisterFilter({ pay: false }))
                  : null
              }
              icon={
                <MaterialIcons
                  name="money-off"
                  size={26}
                  color={colorScheme === "dark" ? "white" : "black"}
                />
              }
            />
          </View>
        )}
        <View className="flex flex-row">
          <InputDate
            twClass="flex-1 mr-2"
            label="Data inicio"
            value={common.registerFilter?.startDate}
            maximumDate={endDate}
            accessibilityLabel="Data do registro"
            onChangeDate={(date: string) =>
              dispatch(setRegisterFilter({ startDate: date }))
            }
          />
          <InputDate
            twClass="flex-1 ml-2"
            label="Data final"
            value={common.registerFilter?.endDate}
            accessibilityLabel="Data do registro"
            minimumDate={startDate}
            onChangeDate={(date: string) =>
              dispatch(setRegisterFilter({ endDate: date }))
            }
          />
        </View>
      </View>
    </Modal>
  );
}
