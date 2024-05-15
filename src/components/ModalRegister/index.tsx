import React, { useEffect, useRef, useState } from "react";
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
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import uuid from "react-native-uuid";
import { NumericFormat } from "react-number-format";

import { Props } from "./types";
import Button from "../Button";
import Select from "../Select";

import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { RootState } from "../../store";
import {
  setModalRegister,
  setRegister,
  setEditRegister,
} from "../../store/commonSlice";

export default function ModalRegister(props: Props) {
  const dispatch = useAppDispatch();
  const common = useAppSelector((state: RootState) => state.commonState);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

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
    { label: "Veículo", value: "vehicle" },
  ];

  const closeModal = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
    Keyboard.dismiss();
    setTimeout(() => {
      dispatch(setModalRegister(""));
    }, 500);
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
    }

    return () => {
      fadeAnim.setValue(0);
    };
  }, [common.modalRegister, fadeAnim]);

  useEffect(() => {
    if (common.modalRegister == "edit") {
      const [month, day, year] = common.registerData.date
        .split("/")
        .map(Number);
      setDate(new Date(year, month - 1, day));
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
      className="p-4 z-10 absolute bg-black/70 min-h-full min-w-full top-0 bottom-0 flex justify-center"
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
        <KeyboardAvoidingView
          behavior="padding"
          className="flex justify-center translate-y-[-30px]"
        >
          <Animated.View
            className="bg-white p-4 rounded-lg m-10"
            style={{ transform: [{ scale: scaleAnim }] }}
            accessibilityViewIsModal
            aria-hidden={
              !(
                common.modalRegister == "register" ||
                common.modalRegister == "edit"
              )
            }
          >
            <Text className="text-black text-center text-xl mb-2 border-b-2 pb-2 border-slate-300">
              {common.modalRegister == "edit"
                ? "Editar Registro"
                : "Criar Novo Registro"}
            </Text>
            <Text className="text-black mb-2">Tipo</Text>
            <Select
              data={dataType}
              maxHeight={300}
              placeholder="Selecione o tipo"
              value={formModal.type}
              handleChangeObject="type"
              onChange={handleChange}
            />
            {showDate && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                is24Hour={true}
                onChange={onChange}
              />
            )}
            <Text className="text-black mb-2">Data</Text>
            <Pressable
              onPress={() => setShowDate(true)}
              className="flex flex-row mb-4 p-1 px-2 bg-white rounded-lg border-2 border-slate-400"
            >
              <MaterialIcons name="calendar-month" size={22} color="black" />
              <TextInput
                className="ml-2 text-black"
                placeholder="Data do registro"
                onChangeText={(value: string) => handleChange(value, "date")}
                value={formModal.date}
                editable={false}
              />
            </Pressable>
            <Text className="text-black mb-2">Nome</Text>
            <TextInput
              className="mb-4 p-1 px-2 bg-white rounded-lg border-2 border-slate-400"
              placeholder="Nome do registro"
              onChangeText={(value: string) => handleChange(value, "name")}
              value={formModal.name}
            />
            <Text className="text-black mb-2">Valor</Text>
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
                    className="mb-4 p-1 px-2 bg-white rounded-lg border-2 border-slate-400"
                    placeholder="Valor do registro"
                    onChangeText={(value: string) => setInputValue(value)}
                    value={value}
                    keyboardType="phone-pad"
                  />
                );
              }}
            />
            <View className="flex flex-row">
              <Button
                text="Cancelar"
                label="Cancelar e fechar o modal do registro"
                className="flex-1 mr-1 p-3 bg-red-600"
                textColor="text-white"
                onPress={() => closeModal()}
                icon={<MaterialIcons name="cancel" size={28} color="white" />}
              />
              <Button
                text={common.modalRegister == "edit" ? "Salvar" : "Criar"}
                label={`${
                  common.modalRegister == "edit" ? "Salvar" : "Criar"
                } o registro`}
                className="flex-1 ml-1 p-3 bg-green-600"
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
