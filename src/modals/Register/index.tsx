import { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  Pressable,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import uuid from "react-native-uuid";
import { useColorScheme } from "nativewind";
import { NumericFormat } from "react-number-format";
import { formatDate } from "@utils";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { RootState } from "@store";
import { setRegister, setEditRegister } from "@store/commonSlice";
import { setModalRegister } from "@store/modalsSlice";
import Select from "@components/Select";
import { intitialForm, initialFormError, dataType } from "./formConstants";
import { formatDateString } from "@utils";
import Modal from "@components/Modal";
import { ModalHandle } from "@components/Modal/types";
import { Props } from "./types";

export default function ModalRegister(props: Props) {
  const modalRef = useRef<ModalHandle>(null);
  const { colorScheme } = useColorScheme();
  const dispatch = useAppDispatch();
  const common = useAppSelector((state: RootState) => state.commonState);
  const modals = useAppSelector((state: RootState) => state.modalsState);
  const [date, setDate] = useState<Date>(new Date());
  const [showDate, setShowDate] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [formModal, setFormModal] = useState(intitialForm);
  const [formError, setFormError] = useState(initialFormError);
  const isEditing = (): boolean => modals.modalRegister === "edit";
  const isOpenModal = (): boolean =>
    ["register", "edit"].includes(modals.modalRegister);

  const handleChange = (value: string | boolean, name: string) => {
    if (name !== "pay") {
      setFormError((prevState) => ({ ...prevState, [name]: !value }));
    }
    setFormModal((prevState) => ({ ...prevState, [name]: value }));
  };

  const onChange = (event: DateTimePickerEvent, date?: Date) => {
    if (date) {
      setShowDate(false);
      setDate(date);
      handleChange(formatDateString(date), "date");
    }
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
      setDate(formatDate(common.registerData.date));
      setFormModal({ ...common.registerData });
      setInputValue(common.registerData.value);
    } else {
      setFormModal(intitialForm);
      setFormError(initialFormError);
      setDate(new Date());
      setInputValue("");
    }
  }, [modals.modalRegister]);

  return (
    <Modal
      ref={modalRef}
      isOpen={isOpenModal()}
      testID={props.testID ? props.testID : "teste-modal"}
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
              modals.modalRegister === "edit"
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
        <View className="flex-1 mr-2">
          <Text className="text-black dark:text-white mb-1 text-base">
            Data
          </Text>
          <Pressable
            onPress={() => setShowDate(true)}
            className="flex flex-row bg-white dark:bg-zinc-800 items-center p-3 pr-4 rounded-lg border-2 border-slate-600 dark:border-zinc-500"
            accessibilityLabel="Data do registro"
            accessibilityRole="button"
          >
            <MaterialIcons
              name="calendar-month"
              size={25}
              color={colorScheme === "dark" ? "white" : "black"}
            />
            <Text className="text-base ml-2 text-black dark:text-white">
              {formModal.date}
            </Text>
          </Pressable>
          {showDate && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              onChange={onChange}
            />
          )}
        </View>
        <View className="flex-1 ml-2">
          <Text className="text-black dark:text-white mb-1 text-base">
            Tipo
          </Text>
          <Select
            data={dataType}
            maxHeight={300}
            placeholder="Selecionar"
            value={formModal.type}
            handleChangeObject="type"
            onChange={handleChange}
            error={formError.type}
          />
        </View>
      </View>
      <View className="flex flex-row mb-6">
        <View className="flex-1 mr-2">
          <Text className="text-black dark:text-white mb-1 text-base">
            Nome
          </Text>
          <TextInput
            accessibilityLabel="Nome do registro"
            className={`text-base dark:text-white p-3 px-4 bg-white dark:bg-zinc-800 rounded-lg border-2 border-slate-600 dark:border-zinc-500 ${
              !!formError.name && "border-red-500"
            }`}
            onChangeText={(value: string) => handleChange(value, "name")}
            value={formModal.name}
          />
        </View>
        <View className="flex-1 ml-2">
          <Text className="text-black dark:text-white mb-1 text-base">
            Valor
          </Text>
          <NumericFormat
            value={inputValue}
            displayType={"text"}
            thousandSeparator={"."}
            decimalSeparator={","}
            decimalScale={2}
            prefix={"R$ "}
            onValueChange={(values) => handleChange(values.value, "value")}
            renderText={(value) => {
              return (
                <TextInput
                  accessibilityLabel="Valor do registro"
                  className={`text-base dark:text-white p-3 px-4 bg-white dark:bg-zinc-800 rounded-lg border-2 border-slate-600 dark:border-zinc-500 ${
                    !!formError.value && "border-red-500"
                  }`}
                  placeholder="R$"
                  onChangeText={(value: string) => setInputValue(value)}
                  value={value}
                  keyboardType="phone-pad"
                  placeholderTextColor={
                    colorScheme === "dark" ? "white" : "black"
                  }
                />
              );
            }}
          />
        </View>
      </View>
      {formModal.type === "expense" && (
        <View className="flex flex-row items-center justify-center mb-6">
          <View className="flex-1">
            <Text className="text-black dark:text-white mb-1 text-base text-center">
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
        </View>
      )}
    </Modal>
  );
}
