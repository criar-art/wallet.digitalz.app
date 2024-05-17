import { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  Text,
  TextInput,
  View,
  SafeAreaView,
  Animated,
} from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import uuid from "react-native-uuid";
import { NumericFormat } from "react-number-format";
import { formatDate } from "../../utils";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { RootState } from "../../store";
import {
  setModalRegister,
  setRegister,
  setEditRegister,
} from "../../store/commonSlice";
import Button from "../Button";
import Select from "../Select";
import { intitialForm, initialFormError, dataType } from "./formConstants";

import { Props } from "./types";

export default function ModalRegister(props: Props) {
  const dispatch = useAppDispatch();
  const common = useAppSelector((state: RootState) => state.commonState);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const transformAnim = useRef(new Animated.Value(0)).current;
  const [date, setDate] = useState<Date>(new Date());
  const [showDate, setShowDate] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [formModal, setFormModal] = useState(intitialForm);
  const [formError, setFormError] = useState(initialFormError);
  const isEditing = (): boolean => common.modalRegister === "edit";
  const isOpenModal = (): boolean =>
    ["register", "edit"].includes(common.modalRegister);

  const handleChange = (value: string, name: string) => {
    setFormError((prevState) => ({ ...prevState, [name]: !value }));
    setFormModal((prevState) => ({ ...prevState, [name]: value }));
  };

  const onChange = (event: DateTimePickerEvent, date?: Date) => {
    if (date) {
      setShowDate(false);
      setDate(date);
      handleChange(new Date(date).toLocaleDateString(), "date");
    }
  };

  const closeModal = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();

    Animated.timing(transformAnim, {
      toValue: 500,
      duration: 500,
      useNativeDriver: true,
    }).start();

    Keyboard.dismiss();
    setTimeout(() => {
      dispatch(setModalRegister(""));
    }, 100);
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
    }
  };

  useEffect(() => {
    if (common.modalRegister) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      Animated.timing(transformAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }

    return () => {
      fadeAnim.setValue(0);
      transformAnim.setValue(500);
    };
  }, [common.modalRegister, fadeAnim]);

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
  }, [common.modalRegister]);

  return (
    <Animated.View
      testID="modal-register"
      className="z-10 absolute bg-black/70 min-h-full min-w-full top-0 bottom-0 flex justify-end"
      style={{
        opacity: fadeAnim,
      }}
      pointerEvents={isOpenModal() ? "auto" : "none"}
    >
      <SafeAreaView>
        <KeyboardAvoidingView behavior="padding" className="flex justify-end">
          {Object.values(formError).includes(true) && (
            <View className="flex flex-row items-center bg-red-300 p-5 rounded-full m-4 border-2 border-black">
              <MaterialCommunityIcons name="alert" size={25} color="black" />
              <Text className="ml-2 font-base font-bold">
                Você precisa preencher todos os campos para criar.
              </Text>
            </View>
          )}
          <Animated.View
            className="bg-white p-5 rounded-t-3xl"
            accessibilityViewIsModal
            style={{
              transform: [
                {
                  translateY: transformAnim,
                },
              ],
            }}
            pointerEvents={isOpenModal() ? "auto" : "none"}
            aria-hidden={!isOpenModal()}
          >
            <View className="flex flex-row items-center justify-center mb-4 border-b-2 pb-2 px-2 border-slate-300">
              <Text className="text-black text-center text-xl mr-2">
                {isEditing() ? "Editar Registro" : "Novo Registro"}
              </Text>
              <View className="ml-auto">
                <MaterialCommunityIcons
                  name={
                    common.modalRegister === "edit"
                      ? "note-edit-outline"
                      : "note-plus-outline"
                  }
                  size={30}
                  color="#aaa"
                />
              </View>
            </View>
            <View className="flex flex-row mb-3">
              <View className="flex-1 mr-2">
                <Text className="text-black mb-1 text-base">Data</Text>
                <Pressable
                  onPress={() => setShowDate(true)}
                  className="flex flex-row items-center p-3 pr-4 rounded-lg border-2 border-slate-600"
                  accessibilityLabel="Data do registro"
                  accessibilityRole="button"
                >
                  <MaterialIcons
                    name="calendar-month"
                    size={25}
                    color="black"
                  />
                  <Text className="text-base ml-2 text-black">
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
                <Text className="text-black mb-1 text-base">Tipo</Text>
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
                <Text className="text-black mb-1 text-base">Nome</Text>
                <TextInput
                  accessibilityLabel="Nome do registro"
                  className={`text-base p-3 px-4 bg-white rounded-lg border-2 border-slate-600 ${
                    !!formError.name && "border-red-500"
                  }`}
                  onChangeText={(value: string) => handleChange(value, "name")}
                  value={formModal.name}
                />
              </View>
              <View className="flex-1 ml-2">
                <Text className="text-black mb-1 text-base">Valor</Text>
                <NumericFormat
                  value={inputValue}
                  displayType={"text"}
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  decimalScale={2}
                  prefix={"R$ "}
                  onValueChange={(values) =>
                    handleChange(values.value, "value")
                  }
                  renderText={(value) => {
                    return (
                      <TextInput
                        accessibilityLabel="Valor do registro"
                        className={`text-base p-3 px-4 bg-white rounded-lg border-2 border-slate-600 ${
                          !!formError.value && "border-red-500"
                        }`}
                        placeholder="R$"
                        onChangeText={(value: string) => setInputValue(value)}
                        value={value}
                        keyboardType="phone-pad"
                        placeholderTextColor="#000"
                      />
                    );
                  }}
                />
              </View>
            </View>
            <View className="flex flex-row">
              <Button
                text="Cancelar"
                label="Cancelar e fechar o modal do registro"
                className="flex-1 mr-2 p-3 bg-red-600"
                textColor="text-white"
                onPress={() => closeModal()}
                icon={<MaterialIcons name="cancel" size={28} color="white" />}
              />
              <Button
                text={isEditing() ? "Salvar" : "Criar"}
                label={`${isEditing() ? "Salvar" : "Criar"} o registro`}
                className="flex-1 ml-2 p-3 bg-green-600"
                textColor="text-white"
                onPress={() => saveStore()}
                icon={
                  <MaterialIcons name="check-circle" size={28} color="white" />
                }
              />
            </View>
          </Animated.View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Animated.View>
  );
}
