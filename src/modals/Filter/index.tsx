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
import InputDate from "@components/common/Form/InputDate";
import utils from "@utils";
import { templateDate } from "@utils/locale";
import { useTranslation } from "react-i18next";

export default function ModalFilter(props: { testID?: string }) {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const dispatch = useAppDispatch();
  const modals = useAppSelector((state: RootState) => state.modalsState);
  const modalRef = useRef<ModalHandle>(null);
  const { stateSelector, setRegisterFilter, setResetFilter } =
    utils.getStateAndActions(modals?.modalFilter);
  const stateData = useAppSelector(stateSelector || (() => null));

  const isOpenModal = useMemo(
    () => ["expense", "entry", "investment"].includes(modals?.modalFilter),
    [modals?.modalFilter]
  );

  const startDate = useMemo(
    () =>
      stateData?.registerFilter?.startDate
        ? parse(stateData.registerFilter.startDate, templateDate, new Date())
        : null,
    [stateData?.registerFilter?.startDate]
  );

  const endDate = useMemo(
    () =>
      stateData?.registerFilter?.endDate
        ? parse(stateData.registerFilter.endDate, templateDate, new Date())
        : null,
    [stateData?.registerFilter?.endDate]
  );

  const resetFilters = () => {
    const { short, endDate, startDate, searchTerm, pay } =
      stateData?.registerFilter;
    if (short || endDate || startDate || searchTerm || pay !== undefined) {
      setResetFilter && dispatch(setResetFilter());
    } else {
      modalRef.current?.closeModal();
    }
  };

  const filterButtons = [
    {
      text: t("inputs.all"),
      value: undefined,
      icon: "density-small",
    },
    {
      text: t("inputs.paid"),
      value: true,
      icon: "attach-money",
    },
    {
      text: t("inputs.no_paid"),
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
        stateData?.registerFilter?.pay === props.value
          ? "bg-gray-200 dark:bg-zinc-500"
          : ""
      } ${props.value == undefined && "ml-0"} ${
        props.value == false && "mr-0"
      }`}
      text={props.text}
      label="Filtro de registros"
      textColor="ml-1 text-black dark:text-white text-xs"
      onPress={() =>
        setRegisterFilter &&
        dispatch(setRegisterFilter({ pay: props.value } as any))
      }
      icon={
        <MaterialIcons
          name={props.iconName}
          size={26}
          color={colorScheme === "dark" ? "white" : "black"}
        />
      }
    >
      {stateData?.registerFilter?.pay === props.value && (
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
        title: t("filter.btn"),
        icon: (
          <MaterialIcons
            name="filter-list"
            size={28}
            color={colorScheme === "dark" ? "white" : "#d4d4d8"}
          />
        ),
      }}
      cancelButton={{
        text: t("filter.btn_reset"),
        label: t("filter.btn_reset_label"),
        icon: (
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={28}
            color="white"
          />
        ),
      }}
      confirmButton={{
        text: t("filter.btn_apply"),
        label: t("filter.btn_apply_label"),
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
            label={t("inputs.date_start")}
            value={stateData?.registerFilter?.startDate}
            maximumDate={endDate}
            accessibilityLabel={`${t("inputs.date_start")} ${t("filter.btn")}`}
            onChangeDate={(date: string) =>
              setRegisterFilter &&
              dispatch(setRegisterFilter({ startDate: date } as any))
            }
          />
          <InputDate
            twClass="flex-1 ml-2"
            label={t("inputs.date_end")}
            value={stateData?.registerFilter?.endDate}
            accessibilityLabel={`${t("inputs.date_end")} ${t("filter.btn")}`}
            minimumDate={startDate}
            onChangeDate={(date: string) =>
              setRegisterFilter &&
              dispatch(setRegisterFilter({ endDate: date } as any))
            }
          />
        </View>
      </View>
    </Modal>
  );
}
