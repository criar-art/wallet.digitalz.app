import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
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
import { setModalRegister, setRegister } from "../../store/commonSlice";

export default function ModalRegister(props: Props) {
  const dispatch = useAppDispatch();
  const common = useAppSelector((state: RootState) => state.commonState);

  const intitialForm = {
    name: "",
    type: "",
    value: "",
    date: new Date().toLocaleDateString(),
  };

  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [inputValue, setInputValue] = useState('');
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

  function saveStore() {
    const { name, value, date, type } = formModal;
    if (name && value && date && type) {
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
      dispatch(setModalRegister(false));
      // Toast.show({
      //   type: 'success',
      //   text1: 'Sucesso',
      //   text2: 'Novo registro criado 👋',
      //   props: { className: 'z-50' }
      // });
    } else {
      // Toast.show({
      //   type: 'error',
      //   text1: 'Atenção',
      //   text2: 'Você precisa preencher tudo 👋',
      //   props: { className: 'z-50' }
      // });
    }
  }

  useEffect(() => {
    setFormModal(intitialForm);
    setDate(new Date());
    setInputValue('')
  }, [common.modalRegister]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={common.modalRegister}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        dispatch(setModalRegister(false));
      }}
    >
      <KeyboardAvoidingView
        behavior="padding"
        className="flex justify-center translate-y-[-40px]"
      >
        <View className="bg-white p-4 rounded-lg border-2 border-slate-400 m-10">
          <Button
            backgroundColor="bg-red-600"
            onPress={() => dispatch(setModalRegister(false))}
            icon={<MaterialIcons name="close" size={22} color="white" />}
            className="scale-75 z-20 absolute top-0 right-0 m-2 rounded-full p-2 w-10"
          />
          <Text className="text-black text-center mb-5 border-b-2 pb-4 border-slate-300">
            Criar Novo Registro
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
                  keyboardType="numeric"
                />
              );
            }}
          />
          <View className="flex flex-row">
            <Button
              text="Cancelar"
              backgroundColor="bg-gray-600"
              className="flex-1 mr-1"
              textColor="text-white"
              onPress={() => dispatch(setModalRegister(false))}
              icon={<MaterialIcons name="cancel" size={22} color="white" />}
            />
            <Button
              text="Salvar"
              backgroundColor="bg-green-600"
              className="flex-1 mr-1"
              textColor="text-white"
              onPress={() => saveStore()}
              icon={<MaterialIcons name="save" size={22} color="white" />}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
