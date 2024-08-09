import { useEffect, useRef, useState } from "react";
import { Keyboard, View } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigationState } from "@react-navigation/native";
import uuid from "react-native-uuid";
import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { RootState } from "@store";
import {
  setBudget,
  setEditBudget,
} from "@store/budgetSlice";
import { setModalBudget } from "@store/modalsSlice";
import { initialForm, initialFormError } from "./formConstants";
import Modal from "@components/common/Modal";
import { ModalHandle } from "@components/common/Modal/types";
import InputText from "@components/common/Form/InputText";
import InputMoney from "@components/common/Form/InputMoney";
import InputDate from "@components/common/Form/InputDate";

export default function ModalBudget(props: { testID?: string }) {
  const { t } = useTranslation();
  const indexTab = useNavigationState(
    (state) => state?.routes[0]?.state?.index
  );
  const modalRef = useRef<ModalHandle>(null);
  const dispatch = useAppDispatch();
  const common = useAppSelector((state: RootState) => state.commonState);
  const budgets = useAppSelector(
    (state: RootState) => state.budgetState.budgets
  );
  const modals = useAppSelector((state: RootState) => state.modalsState);
  const [inputMoney, setInputMoney] = useState<string>("");
  const [formModal, setFormModal] = useState(initialForm);
  const [formError, setFormError] = useState(initialFormError);
  const isEditing = (): boolean => modals?.modalBudget === "edit";
  const isOpenModal = (): boolean =>
    ["budget", "edit", "transaction"].includes(modals?.modalBudget);

  const handleChange = (
    value: string | boolean | Date | null,
    name: string
  ) => {
    setFormModal((prevState) => ({ ...prevState, [name]: value }));
    if(name !== 'description')
      setFormError((prevState) => ({ ...prevState, [name]: !value }));
  };

  const closeModal = () => {
    Keyboard.dismiss();
    modalRef.current?.closeModal();
  };

  const saveStore = () => {
    const { name, value, date_end } = formModal;
    const errors = { name: !name, value: !value, date_end: !date_end };
    setFormError(errors);

    const data: any = isEditing()
      ? {
          id: common.budgetData.id,
          ...formModal,
        }
      : { id: uuid.v4(), ...formModal, name: formModal.name.trim() };

    if (!Object.values(errors).some((error) => error)) {
      dispatch(
        isEditing()
          ? setEditBudget(data)
          : setBudget([data, ...budgets] as any)
      );
      closeModal();
    } else {
      modalRef.current?.startShake();
    }
  };

  useEffect(() => {
    if (isEditing()) {
      setFormModal({ ...common.budgetData });
      setInputMoney(common.budgetData.value);
    } else {
      if (indexTab) {
        setFormModal({ ...initialForm });
      } else {
        setFormModal(initialForm);
      }
      setFormError(initialFormError);
      setInputMoney("");
    }
  }, [modals?.modalBudget]);

  return (
    <Modal
      ref={modalRef}
      isOpen={isOpenModal()}
      testID={props.testID ? props.testID : "teste-modal"}
      cancelAction={() => closeModal()}
      closeAction={() => dispatch(setModalBudget(""))}
      confirmAction={() => saveStore()}
      alertModal={{
        show: Object.values(formError).includes(true),
        text: t("common.validation"),
        icon: <MaterialCommunityIcons name="alert" size={25} color="black" />,
      }}
      header={{
        title: isEditing()
          ? t("common.edit_budget")
          : t("common.new_budget"),
        icon: (
          <MaterialCommunityIcons
            name={
              modals?.modalBudget === "edit"
                ? "note-edit-outline"
                : "note-plus-outline"
            }
            size={30}
            color="#d4d4d8"
          />
        ),
      }}
      confirmButton={{
        text: isEditing() ? t("common.btn_save") : t("common.btn_create"),
        label: `${t("common.btn_confirm_label")} ${isEditing() ? t("common.btn_save") : t("common.btn_create")}`,
        icon: <MaterialIcons name="check" size={28} color="white" />,
      }}
    >
      <View className="flex flex-row mb-2 mt-2">
        <InputText
          twClass="flex-1"
          label={t("inputs.name")}
          accessibilityLabel={t("modalContent.budget.inputsLabel.nameOfBudget")}
          onChangeText={(value: string) => handleChange(value, "name")}
          value={formModal.name}
          error={!!formError.name}
        />
      </View>
      <View className="flex flex-row mb-2 mt-2">
        <InputText
          twClass="flex-1"
          label={t("inputs.description")}
          accessibilityLabel={t("modalContent.budget.inputsLabel.descriptionOfBudget")}
          onChangeText={(value: string) => handleChange(value, "description")}
          value={formModal.description}
        />
      </View>
      <View className="flex flex-row mb-4">
        <InputDate
          twClass="flex-1 mr-2"
          label={t("inputs.date")}
          value={formModal.date_end}
          accessibilityLabel={t("modalContent.budget.inputsLabel.dateEndOfBudget")}
          onChangeDate={(date_end: Date | null) => handleChange(date_end, "date_end")}
          error={!!formError.date_end}
        />
        <InputMoney
          twClass="flex-1 ml-2"
          label={t("inputs.value")}
          accessibilityLabel={t("modalContent.budget.inputsLabel.valueOfBudget")}
          value={inputMoney}
          onValueChange={(values: any) => handleChange(values.value, "value")}
          onChangeText={(value: string) => setInputMoney(value)}
          error={!!formError.value}
        />
      </View>
    </Modal>
  );
}
