import { useEffect, useRef, useState } from "react";
import { Keyboard, Switch, Text, View } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import uuid from "react-native-uuid";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { RootState } from "@store";
import { setRegister, setEditRegister } from "@store/commonSlice";
import { setModalRegister } from "@store/modalsSlice";
import { intitialForm, initialFormError, dataType } from "./formConstants";
import Modal from "@components/common/Modal";
import { ModalHandle } from "@components/common/Modal/types";
import InputSelect from "@components/common/Form/InputSelect";
import InputText from "@components/common/Form/InputText";
import InputMoney from "@components/common/Form/InputMoney";
import InputDate from "@components/common/Form/InputDate";
import { useNavigationState } from "@react-navigation/native";
import { Props } from "./types";

export default function ModalRegister(props: Props) {
  const indexTab = useNavigationState(
    (state) => state?.routes[0]?.state?.index
  );
  const modalRef = useRef<ModalHandle>(null);
  const dispatch = useAppDispatch();
  const common = useAppSelector((state: RootState) => state.commonState);
  const modals = useAppSelector((state: RootState) => state.modalsState);
  const [inputMoney, setInputMoney] = useState<string>("");
  const [formModal, setFormModal] = useState(intitialForm);
  const [formError, setFormError] = useState(initialFormError);
  const isEditing = (): boolean => modals?.modalRegister === "edit";
  const isOpenModal = (): boolean =>
    ["register", "edit"].includes(modals?.modalRegister);

  const handleChange = (value: string | boolean, name: string) => {
    setFormModal((prevState) => ({ ...prevState, [name]: value }));
    if (name !== "pay")
      setFormError((prevState) => ({ ...prevState, [name]: !value }));
  };

  const closeModal = () => {
    Keyboard.dismiss();
    modalRef.current?.closeModal();
  };

  const saveStore = () => {
    const { name, value, type } = formModal;
    const errors = { name: !name, value: !value, type: !type };
    setFormError(errors);

    const data = isEditing()
      ? { id: common.registerData.id, ...formModal }
      : { id: uuid.v4(), ...formModal };

    if (!Object.values(errors).some((error) => error)) {
      dispatch(
        isEditing()
          ? setEditRegister(data)
          : setRegister([data, ...common.registers])
      );
      closeModal();
    } else {
      modalRef.current?.startShake();
    }
  };

  useEffect(() => {
    if (isEditing()) {
      setFormModal({ ...common.registerData });
      setInputMoney(common.registerData.value);
    } else {
      if (indexTab) {
        setFormModal({ ...intitialForm, type: dataType[indexTab - 1].value });
      } else {
        setFormModal(intitialForm);
      }
      setFormError(initialFormError);
      setInputMoney("");
    }
  }, [modals?.modalRegister]);

  return (
    <Modal
      ref={modalRef}
      isOpen={isOpenModal()}
      testID={props.testID ? props.testID : "teste-modal"}
      cancelAction={() => closeModal()}
      closeAction={() => dispatch(setModalRegister(""))}
      confirmAction={() => saveStore()}
      alertModal={{
        show: Object.values(formError).includes(true),
        text: "Você precisa preencher todos os campos",
        icon: <MaterialCommunityIcons name="alert" size={25} color="black" />,
      }}
      header={{
        title: isEditing() ? "Editar Registro" : "Novo Registro",
        icon: (
          <MaterialCommunityIcons
            name={
              modals?.modalRegister === "edit"
                ? "note-edit-outline"
                : "note-plus-outline"
            }
            size={30}
            color="#aaa"
          />
        ),
      }}
      confirmButton={{
        text: isEditing() ? "Salvar" : "Criar",
        label: "Ok fechar o modal de informações",
        icon: <MaterialIcons name="check" size={28} color="white" />,
      }}
    >
      <View className="flex flex-row mb-3 mt-3">
        <InputDate
          twClass="flex-1 mr-2"
          label="Data"
          value={formModal.date}
          accessibilityLabel="Data do registro"
          onChangeDate={handleChange}
        />
        <InputSelect
          twClass="flex-1 ml-2"
          label="Tipo"
          data={dataType}
          maxHeight={300}
          placeholder="Selecionar"
          value={formModal.type}
          handleChangeObject="type"
          onChange={handleChange}
          error={!!formError.type}
        />
      </View>
      <View className="flex flex-row mb-6">
        <InputText
          twClass="flex-1 mr-2"
          label="Nome"
          accessibilityLabel="Nome do registro"
          onChangeText={(value: string) => handleChange(value, "name")}
          value={formModal.name}
          error={!!formError.name}
        />
        <InputMoney
          twClass="flex-1 ml-2"
          label="Valor"
          accessibilityLabel="Valor do registro"
          value={inputMoney}
          onValueChange={(values: any) => handleChange(values.value, "value")}
          onChangeText={(value: string) => setInputMoney(value)}
          error={!!formError.value}
        />
      </View>
      {formModal.type === "expense" && (
        <View className="flex flex-row items-center justify-center mb-4">
          <Text className="text-black dark:text-white mr-6 text-base text-center">
            Paga
          </Text>
          <View className="flex items-center justify-center pb-2">
            <Switch
              accessibilityLabel="Pagamento"
              value={formModal.pay}
              onValueChange={(value) => handleChange(value, "pay")}
              trackColor={{ false: "rgb(220 38 38)", true: "rgb(34 197 94)" }}
              thumbColor="#f4f3f4"
              style={{ transform: [{ scale: 1.5 }] }}
            />
          </View>
        </View>
      )}
    </Modal>
  );
}
