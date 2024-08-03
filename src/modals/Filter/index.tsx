import { useRef, useMemo, useEffect, useCallback } from "react";
import { Keyboard, View } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { useColorScheme } from "nativewind";
import { RootState } from "@store";
import { setModalFilter } from "@store/modalsSlice";
import Modal from "@components/common/Modal";
import { ModalHandle } from "@components/common/Modal/types";
import Button from "@components/common/Button";
import InputDate from "@components/common/Form/InputDate";
import InputText from "@components/common/Form/InputText";
import { useTranslation } from "react-i18next";

import {
  selectRegistersFilterEntry,
  selectRegistersFilterExpense,
  selectRegistersFilterInvestment,
} from "@store/commonSelects";
import { setRegisterFilterEntry, setResetFilterEntry } from "@store/entrySlice";
import {
  setRegisterFilterExpense,
  setResetFilterExpense,
} from "@store/expenseSlice";
import {
  setRegisterFilterInvestment,
  setResetFilterInvestment,
} from "@store/investmentSlice";
import utils from "@utils";

export default function ModalFilter(props: { testID?: string }) {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const dispatch = useAppDispatch();
  const modals = useAppSelector((state: RootState) => state.modalsState);
  const modalRef = useRef<ModalHandle>(null);
  const getRegistersFilterEntry = useAppSelector(selectRegistersFilterEntry);
  const getRegistersFilterExpense = useAppSelector(
    selectRegistersFilterExpense
  );
  const getRegistersFilterInvestment = useAppSelector(
    selectRegistersFilterInvestment
  );

  // Define a mapping of props.type to selectors
  const selectorMapping: any = {
    entry: {
      filter: getRegistersFilterEntry,
      setRegisterFilter: setRegisterFilterEntry,
      setResetFilter: setResetFilterEntry,
    },
    expense: {
      filter: getRegistersFilterExpense,
      setRegisterFilter: setRegisterFilterExpense,
      setResetFilter: setResetFilterExpense,
    },
    investment: {
      filter: getRegistersFilterInvestment,
      setRegisterFilter: setRegisterFilterInvestment,
      setResetFilter: setResetFilterInvestment,
    },
  };

  // Select the appropriate selectors based on props.type
  const selectedSelectors = selectorMapping[modals?.modalFilter];

  const getRegistersFilter = selectedSelectors ? selectedSelectors.filter : {};
  const setRegisterFilter = selectedSelectors
    ? selectedSelectors.setRegisterFilter
    : {};
  const setResetFilter = selectedSelectors
    ? selectedSelectors.setResetFilter
    : {};

  const handleChange = (
    value: string | boolean | Date | null,
    name: string
  ) => {
    dispatch(setRegisterFilter({ ...getRegistersFilter, [name]: value }));
  };

  const emptyFilter = useMemo(
    () => utils.isObjectEmpty(getRegistersFilter),
    [getRegistersFilter]
  );
  const isOpenModal = useMemo(
    () => ["expense", "entry", "investment"].includes(modals?.modalFilter),
    [modals?.modalFilter]
  );

  useEffect(() => {
    Keyboard.dismiss();
  }, [isOpenModal]);

  const resetFilters = useCallback(() => {
    if (!emptyFilter) {
      if (typeof setResetFilter == "function") {
        dispatch(setResetFilter());
      }
    } else {
      modalRef.current?.closeModal();
    }
  }, [dispatch, setResetFilter, emptyFilter]);

  const filterButtons = useMemo(
    () => [
      {
        text: t("inputs.all"),
        value: null,
        icon: "join-full",
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
    ],
    [t, getRegistersFilter.pay]
  );

  const RenderFilterButton = useCallback(
    (props: {
      value: boolean | null;
      text: string;
      iconName: "join-full" | "attach-money" | "money-off";
    }) => (
      <Button
        twClass={`h-[54px] border-2 border-slate-600 dark:border-zinc-500 p-3 bg-white dark:bg-zinc-800 mx-2 flex-1 ${
          props.value == null && "ml-0"
        } ${props.value == false && "mr-0"}`}
        text={props.text}
        label="Filtro de registros"
        textColor="ml-1 text-black dark:text-white text-xs"
        onPress={() => handleChange(props.value, "pay")}
        icon={
          <MaterialIcons
            name={props.iconName}
            size={23}
            color={colorScheme === "dark" ? "white" : "black"}
          />
        }
      >
        {getRegistersFilter.pay === props.value && (
          <View className="absolute -top-3 z-20 bg-green-600 rounded-full">
            <MaterialIcons
              name="check-circle"
              size={22}
              color={colorScheme === "dark" ? "#222" : "white"}
            />
          </View>
        )}
      </Button>
    ),
    [getRegistersFilter.pay, handleChange, colorScheme]
  );

  return (
    <Modal
      ref={modalRef}
      optional
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
      cancelButton={
        !emptyFilter
          ? {
              text: t("filter.btn_reset"),
              label: t("filter.btn_reset_label"),
              icon: (
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  size={28}
                  color="white"
                />
              ),
            }
          : null
      }
      confirmButton={{
        text: t("filter.btn_apply"),
        label: t("filter.btn_apply_label"),
        icon: <MaterialIcons name="check" size={28} color="white" />,
      }}
    >
      <View className="mb-4 pt-4">
        {modals?.modalFilter === "expense" && (
          <View className="flex flex-row mb-2 w-full">
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
            value={getRegistersFilter.startDate}
            maximumDate={getRegistersFilter.endDate}
            accessibilityLabel={`${t("inputs.date_start")} ${t("filter.btn")}`}
            onChangeDate={(date: Date | null) =>
              handleChange(date, "startDate")
            }
          />
          <InputDate
            twClass="flex-1 ml-2"
            label={t("inputs.date_end")}
            value={getRegistersFilter.endDate}
            accessibilityLabel={`${t("inputs.date_end")} ${t("filter.btn")}`}
            minimumDate={getRegistersFilter.startDate}
            onChangeDate={(date: Date | null) => handleChange(date, "endDate")}
          />
        </View>
        <View className="flex flex-row mt-4 w-full">
          <InputText
            twClass={`flex-1`}
            placeholder={t("inputs.search")}
            accessibilityLabel="Buscar registro"
            onChangeText={(value: string) => handleChange(value, "searchTerm")}
            value={getRegistersFilter.searchTerm}
            icon={
              <MaterialIcons
                name="search"
                size={28}
                color={colorScheme === "dark" ? "white" : "black"}
              />
            }
          />
        </View>
      </View>
    </Modal>
  );
}
