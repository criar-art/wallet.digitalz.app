import { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  SafeAreaView,
  Animated,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
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
import { Props } from "./types";

export default function ModalRegister(props: Props) {
  const dispatch = useAppDispatch();
  const common = useAppSelector((state: RootState) => state.commonState);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const transformAnim = useRef(new Animated.Value(0)).current;

  const intitialForm = {
    name: "",
    type: "",
    value: "",
    date: new Date().toLocaleDateString(),
  };

  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [formModal, setFormModal] = useState(intitialForm);

  const handleChange = (value: string, name: string) => {
    setFormModal((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShowDate(false);
    setDate(currentDate);
    handleChange(new Date(currentDate).toLocaleDateString(), "date");
  };

  const dataType = [
    { label: "Investimento", value: "investiment" },
    { label: "Entrada", value: "entry" },
    { label: "Despesa", value: "expense" },
    // { label: "Veículo", value: "vehicle" },
  ];

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

  function saveStore() {
    const { name, value, date, type } = formModal;
    if (name && value && date && type) {
      if (common.modalRegister == "edit") {
        dispatch(
          setEditRegister({
            id: common.registerData.id,
            ...formModal,
          })
        );
      } else {
        const values = [
          {
            id: uuid.v4(),
            name,
            value,
            date,
            type,
          },
          ...common.registers,
        ];
        dispatch(setRegister(values));
      }
      closeModal();
    }
  }

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
    if (common.modalRegister == "edit") {
      setDate(formatDate(common.registerData.date));
      setFormModal({ ...common.registerData });
      setInputValue(common.registerData.value);
    } else {
      setFormModal(intitialForm);
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
      pointerEvents={
        !(common.modalRegister == "register" || common.modalRegister == "edit")
          ? "none"
          : "auto"
      }
    >
      <SafeAreaView>
        <KeyboardAvoidingView behavior="padding" className="flex justify-end">
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
            pointerEvents={
              !(
                common.modalRegister == "register" ||
                common.modalRegister == "edit"
              )
                ? "none"
                : "auto"
            }
            aria-hidden={
              !(
                common.modalRegister == "register" ||
                common.modalRegister == "edit"
              )
            }
          >
            <Text className="text-black text-center text-xl mb-4 border-b-2 pb-2 border-slate-300">
              {common.modalRegister == "edit"
                ? "Editar Registro"
                : "Novo Registro"}
            </Text>
            <View className="flex flex-row mb-3">
              <View className="flex-1 mr-2">
                <Text className="text-black mb-1 text-base">Data</Text>
                <TouchableOpacity
                  onPress={() => setShowDate(true)}
                  className="flex flex-row p-3 pr-4 rounded-lg border-2 border-slate-600"
                  accessibilityLabel="Data do registro"
                  accessibilityRole="button"
                >
                  <MaterialIcons
                    name="calendar-month"
                    size={25}
                    color="black"
                  />
                  <TextInput
                    className="text-base ml-2 text-black"
                    placeholder="Data do registro"
                    onChangeText={(value: string) =>
                      handleChange(value, "date")
                    }
                    value={formModal.date}
                    editable={false}
                    pointerEvents="none"
                  />
                </TouchableOpacity>
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
                />
              </View>
            </View>
            <View className="flex flex-row mb-6">
              <View className="flex-1 mr-2">
                <Text className="text-black mb-1 text-base">Nome</Text>
                <TextInput
                  aria-label="Nome do registro"
                  className="text-base p-3 px-4 bg-white rounded-lg border-2 border-slate-600"
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
                        aria-label="valor do registro"
                        className="text-base p-3 px-4 bg-white rounded-lg border-2 border-slate-600"
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
                text={common.modalRegister == "edit" ? "Salvar" : "Criar"}
                label={`${
                  common.modalRegister == "edit" ? "Salvar" : "Criar"
                } o registro`}
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
