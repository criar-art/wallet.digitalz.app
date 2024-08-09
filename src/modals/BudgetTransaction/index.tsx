import { useEffect, useRef, useState } from "react";
import { Keyboard, View } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigationState } from "@react-navigation/native";
import uuid from "react-native-uuid";
import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { RootState } from "@store";
import {
  setTransaction,
  setEditTransaction,
} from "@store/budgetSlice";
import { setModalBudgetTransaction } from "@store/modalsSlice";
import { initialForm, initialFormError } from "./formConstants";
import Modal from "@components/common/Modal";
import { ModalHandle } from "@components/common/Modal/types";
import InputText from "@components/common/Form/InputText";
import InputMoney from "@components/common/Form/InputMoney";

export default function ModalBudget(props: { testID?: string }) {
  const { t } = useTranslation();
  const indexTab = useNavigationState(
    (state) => state?.routes[0]?.state?.index
  );
  const modalRef = useRef<ModalHandle>(null);
  const dispatch = useAppDispatch();
  const common = useAppSelector((state: RootState) => state.commonState);
  const modals = useAppSelector((state: RootState) => state.modalsState);
  const [inputMoney, setInputMoney] = useState<string>("");
  const [formModal, setFormModal] = useState(initialForm);
  const [formError, setFormError] = useState(initialFormError);
  const isEditing = (): boolean => modals?.modalBudgetTransaction.type == "edit";
  const isOpenModal = (): boolean => !!modals?.modalBudgetTransaction;
  const idBudget = modals?.modalBudgetTransaction?.id;

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
    const { name, value } = formModal;
    const errors = { name: !name, value: !value };
    setFormError(errors);

    const data: any = isEditing()
      ? {
          id: common.budgetTransactionData.id,
          ...formModal,
        }
      : { id: uuid.v4(), ...formModal, name: formModal.name.trim() };

    if (!Object.values(errors).some((error) => error)) {
      dispatch(
        isEditing()
          ? setEditTransaction({ id: idBudget, transaction: data} as any)
          : setTransaction({ id: idBudget, transaction: data} as any)
      );

      closeModal();
    } else {
      modalRef.current?.startShake();
    }
  };

  useEffect(() => {
    if (isEditing()) {
      setFormModal({ ...common.budgetTransactionData });
      setInputMoney(common.budgetTransactionData.value);
    } else {
      if (indexTab) {
        setFormModal({ ...initialForm });
      } else {
        setFormModal(initialForm);
      }
      setFormError(initialFormError);
      setInputMoney("");
    }
  }, [modals?.modalBudgetTransaction]);

  return (
    <Modal
      ref={modalRef}
      isOpen={isOpenModal()}
      testID={props.testID ? props.testID : "teste-modal"}
      cancelAction={() => closeModal()}
      closeAction={() => dispatch(setModalBudgetTransaction(""))}
      confirmAction={() => saveStore()}
      alertModal={{
        show: Object.values(formError).includes(true),
        text: t("common.validation"),
        icon: <MaterialCommunityIcons name="alert" size={25} color="black" />,
      }}
      header={{
        title: isEditing()
          ? t("common.edit_transaction")
          : t("common.new_transaction"),
        icon: (
          <MaterialCommunityIcons
            name={
              modals?.modalBudgetTransaction.type === "edit"
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
      <View className="flex flex-row mt-2 mb-4">
        <InputText
          twClass="flex-1 mr-2"
          label={t("inputs.name")}
          accessibilityLabel={t("modalContent.budgetTransaction.inputsLabel.nameOfBudget")}
          onChangeText={(value: string) => handleChange(value, "name")}
          value={formModal.name}
          error={!!formError.name}
        />
        <InputMoney
          twClass="flex-1 ml-2"
          label={t("inputs.value")}
          accessibilityLabel={t("modalContent.budgetTransaction.inputsLabel.valueOfBudget")}
          value={inputMoney}
          onValueChange={(values: any) => handleChange(values.value, "value")}
          onChangeText={(value: string) => setInputMoney(value)}
          error={!!formError.value}
        />
      </View>
    </Modal>
  );
}
