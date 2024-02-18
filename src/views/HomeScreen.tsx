import { useState } from "react";
import {
  Alert,
  Button,
  Modal,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import * as SecureStore from "expo-secure-store";

import { MaterialIcons } from "@expo/vector-icons";

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, onChangeName] = useState("");
  const [value, onChangeValue] = useState("");
  const [date, onChangeDate] = useState("");
  const [type, onChangeType] = useState("");
  const [result, setResult] = useState("");

  async function save(key: string, value: any) {
    await SecureStore.setItemAsync(key, value);
  }

  async function getValueFor(key: string) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      setResult(result);
      console.log("🔐 Here's your value 🔐 \n" + result);
    } else {
      console.log("No values stored under that key.");
    }
  }

  return (
    <View testID="home-screen" className="p-5">
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View className="bg-white p-4 rounded-lg border-2 border-slate-400 m-10">
          <TouchableHighlight
            className="scale-75 z-20 absolute top-0 right-0 m-2 flex justify-center items-center w-10 bg-red-600 rounded-full p-2 text-center"
            onPress={() => setModalVisible(!modalVisible)}
          >
            <MaterialIcons name="close" size={22} color="white" />
          </TouchableHighlight>
          <Text className="text-black text-center mb-5 border-b-2 pb-4 border-slate-300">
            Criar Novo Registro
          </Text>
          <Text className="text-black mb-2">Tipo</Text>
          <TextInput
            className="mb-4 p-2 px-4 bg-white rounded-lg border-2 border-slate-400"
            onChangeText={onChangeType}
            value={type}
          />
          <Text className="text-black mb-2">Data</Text>
          <TextInput
            className="mb-4 p-2 px-4 bg-white rounded-lg border-2 border-slate-400"
            onChangeText={onChangeDate}
            value={date}
          />
          <Text className="text-black mb-2">Nome</Text>
          <TextInput
            className="mb-4 p-2 px-4 bg-white rounded-lg border-2 border-slate-400"
            onChangeText={onChangeName}
            value={name}
          />
          <Text className="text-black mb-2">Valor</Text>
          <TextInput
            className="mb-4 p-2 px-4 bg-white rounded-lg border-2 border-slate-400"
            onChangeText={onChangeValue}
            value={value}
          />
          <TouchableHighlight
            className="flex justify-center items-center flex-row bg-green-600 rounded-lg p-2 text-center"
            onPress={() => {
              save("wallet", [
                {
                  name,
                  value,
                  date,
                  type,
                }
              ])
              getValueFor('wallet')
            }}
          >
            <>
              <MaterialIcons name="save" size={22} color="white" />
              <Text className="ml-2 text-center text-white">Salvar</Text>
            </>
          </TouchableHighlight>
        </View>
      </Modal>
      <TouchableHighlight
        className="flex justify-center items-center flex-row bg-green-600 rounded-lg p-2 text-center"
        onPress={() => setModalVisible(true)}
      >
        <>
          <MaterialIcons name="add-circle" size={22} color="white" />
          <Text className="ml-2 text-center text-white">Novo Registro</Text>
        </>
      </TouchableHighlight>
      <Text className="text-black mt-10">Result: {result}</Text>
    </View>
  );
}
