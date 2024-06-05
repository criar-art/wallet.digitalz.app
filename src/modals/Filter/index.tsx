import { useRef, useMemo } from "react";
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

export default function ModalFilter(props: { testID?: string }) {
  const { colorScheme } = useColorScheme();
  const dispatch = useAppDispatch();
  const modals = useAppSelector((state: RootState) => state.modalsState);
  const common = useAppSelector((state: RootState) => state.commonState);
  const modalRef = useRef<ModalHandle>(null);

  const isOpenModal = useMemo(
    () => ["expense", "entry", "investment"].includes(modals?.modalFilter),
    [modals?.modalFilter]
  );

  const startDate = useMemo(
    () =>
      common.registerFilter?.startDate
        ? parse(common.registerFilter.startDate, "dd/MM/yyyy", new Date())
        : null,
    [common.registerFilter?.startDate]
  );

  const endDate = useMemo(
    () =>
      common.registerFilter?.endDate
        ? parse(common.registerFilter.endDate, "dd/MM/yyyy", new Date())
        : null,
    [common.registerFilter?.endDate]
  );

  const resetFilters = () => {
    const { short, endDate, startDate, searchTerm, pay } =
      common.registerFilter;
    if (short || endDate || startDate || searchTerm || pay !== undefined) {
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

  const filterButtons = [
    {
      text: "Todos",
      value: undefined,
      icon: "density-small",
    },
    {
      text: "Pagos",
      value: true,
      icon: "attach-money",
    },
    {
      text: "Não Pagos",
      value: false,
      icon: "money-off",
    },
  ];

  const RenderFilterButton = (props: {
    value: boolean | undefined;
    text: string;
    iconName: "density-small" | "attach-money" | "money-off";
  }) => (
    <Button
      twClass={`border-2 border-slate-600 dark:border-zinc-500 p-3 h-14 bg-white dark:bg-zinc-800 mx-2 flex-1 ${
        common.registerFilter?.pay === props.value
          ? "bg-gray-200 dark:bg-zinc-500"
          : ""
      } ${props.value == undefined && "ml-0"} ${
        props.value == false && "mr-0"
      }`}
      text={props.text}
      label="Filtro de registros"
      textColor="ml-1 text-black dark:text-white text-xs"
      onPress={() => dispatch(setRegisterFilter({ pay: props.value }))}
      icon={
        <MaterialIcons
          name={props.iconName}
          size={26}
          color={colorScheme === "dark" ? "white" : "black"}
        />
      }
    >
      {common.registerFilter?.pay === props.value && (
        <View className="absolute -top-3 z-20 bg-green-600 rounded-full">
          <MaterialIcons
            name="check-circle"
            size={22}
            color={colorScheme === "dark" ? "black" : "white"}
          />
        </View>
      )}
    </Button>
  );

  return (
    <Modal
      ref={modalRef}
      optional={true}
      isOpen={isOpenModal}
      testID={props.testID || "test-modal"}
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
        {modals?.modalFilter === "expense" && (
          <View className="flex flex-row mb-4 w-full">
            {filterButtons.map((item: any) => (
              <RenderFilterButton
                key={item.text}
                text={item.text}
                iconName={item.icon}
                value={item.value}
              />
            ))}
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
