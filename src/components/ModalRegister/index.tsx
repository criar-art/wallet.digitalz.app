import React, { useEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, Modal, Pressable, Text, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import uuid from "react-native-uuid";
import * as SecureStore from "expo-secure-store";

import { Props } from "./types";
import Button from "../Button";

export default function ModalRegister(props: Props) {
  const intitialForm = {
    name: "",
    type: "",
    value: "",
    date: new Date().toLocaleDateString(),
  };
  const [result, setResult] = useState([]);
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
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


  async function save(key: string, value: any) {
    await SecureStore.setItemAsync(key, value);
  }

  async function getValueFor(key: string) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      setResult(JSON.parse(result));
      console.log("🔐 Here's your value 🔐 \n" + result);
    } else {
      console.log("No values stored under that key.");
    }
  }

  function saveStore() {
    const { name, value, date, type } = formModal;
    if (name && value && date && type) {
      const values = JSON.stringify([
        {
          id: uuid.v4(),
          name,
          value,
          date,
          type,
        },
        ...result,
      ]);

      save("wallet", values);
      getValueFor("wallet");
      setModalVisible(false);
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

  function remove(target: string) {
    const filter = result.filter(({ id }) => id !== target);
    save("wallet", JSON.stringify(filter));
    getValueFor("wallet");
  }

  useEffect(() => {
    getValueFor("wallet");
  }, []);

  useEffect(() => {
    setFormModal(intitialForm);
    setDate(new Date());
  }, [modalVisible]);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <KeyboardAvoidingView
        behavior="padding"
        className="flex justify-center translate-y-[-40px]"
      >
        <View className="bg-white p-4 rounded-lg border-2 border-slate-400 m-10">
          <Button
            backgroundColor="bg-red-600"
            className="scale-75 z-20 absolute top-0 right-0 m-2 rounded-full p-2 w-10"
            onPress={() => setModalVisible(!modalVisible)}
            icon={<MaterialIcons name="close" size={22} color="white" />}
          />
          <Text className="text-black text-center mb-5 border-b-2 pb-4 border-slate-300">
            Criar Novo Registro
          </Text>
          <Text className="text-black mb-2">Tipo</Text>
          <Dropdown
            style={{
              marginBottom: 20,
              paddingHorizontal: 10,
              borderRadius: 8,
              borderColor: "#94a3b8",
              borderWidth: 2,
            }}
            containerStyle={{
              paddingVertical: 2.5,
              borderRadius: 8,
              borderColor: "#94a3b8",
              borderWidth: 2,
              backgroundColor: "#fff",
            }}
            itemContainerStyle={{
              borderRadius: 6,
              marginHorizontal: 5,
              marginVertical: 2.5,
              backgroundColor: "#eee",
              padding: 0,
              height: 45,
            }}
            itemTextStyle={{
              height: 20,
              margin: 0,
              padding: 0,
              position: "relative",
              top: -5,
            }}
            activeColor="#dcfce7"
            data={dataType}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Selecione o tipo"
            value={formModal.type}
            onChange={({ value }) => handleChange(value, "type")}
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
          <TextInput
            className="mb-4 p-1 px-2 bg-white rounded-lg border-2 border-slate-400"
            placeholder="Valor do registro"
            onChangeText={(value: string) =>
              handleChange(value.replace(/[^0-9]/g, ""), "value")
            }
            value={formModal.value}
            keyboardType="numeric"
          />
          <View className="flex flex-row">
            <Button
              text="Cancelar"
              backgroundColor="bg-gray-600"
              className="flex-1 mr-1"
              textColor="text-white"
              onPress={() => setModalVisible(false)}
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
