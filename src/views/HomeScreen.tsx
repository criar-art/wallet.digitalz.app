import { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import uuid from 'react-native-uuid';
import * as SecureStore from "expo-secure-store";
import { MaterialIcons } from "@expo/vector-icons";

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, onChangeName] = useState("");
  const [value, onChangeValue] = useState("");
  const [date, onChangeDate] = useState("");
  const [type, onChangeType] = useState("");
  const [result, setResult] = useState([]);

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

  function saveStore () {
    const values = JSON.stringify([
      {
        id: uuid.v4(),
        name,
        value,
        date,
        type,
      },
      ...result
    ])
    save("wallet", values);
    getValueFor("wallet");
  }

  useEffect(() => {
    getValueFor("wallet");
  }, []);

  return (
    <View testID="home-screen" className="p-5">
      <TouchableHighlight
        className="flex justify-center items-center flex-row bg-green-600 rounded-lg p-2 text-center"
        onPress={() => setModalVisible(true)}
      >
        <>
          <MaterialIcons name="add-circle" size={22} color="white" />
          <Text className="ml-2 text-center text-white">Novo Registro</Text>
        </>
      </TouchableHighlight>

      {result.map((item: any) => (
        <View key={item.id} className="text-black mt-5 bg-white p-4 rounded-lg shadow-lg">
          <Text className="text-black">Tipo: {item.type}</Text>
          <Text className="text-black">Data: {item.date}</Text>
          <Text className="text-black">Nome: {item.name}</Text>
          <Text className="text-black">Valor: {item.value}</Text>
        </View>
      ))}

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
            className="mb-4 p-1 px-2 bg-white rounded-lg border-2 border-slate-400"
            placeholder="Tipo do registro"
            onChangeText={onChangeType}
            value={type}
          />
          <Text className="text-black mb-2">Data</Text>
          <TextInput
            className="mb-4 p-1 px-2 bg-white rounded-lg border-2 border-slate-400"
            placeholder="Data do registro"
            onChangeText={onChangeDate}
            value={date}
          />
          <Text className="text-black mb-2">Nome</Text>
          <TextInput
            className="mb-4 p-1 px-2 bg-white rounded-lg border-2 border-slate-400"
            placeholder="Nome do registro"
            onChangeText={onChangeName}
            value={name}
          />
          <Text className="text-black mb-2">Valor</Text>
          <TextInput
            className="mb-4 p-1 px-2 bg-white rounded-lg border-2 border-slate-400"
            placeholder="Valor do registro"
            onChangeText={onChangeValue}
            value={value}
          />
          <View className="flex flex-row">
            <TouchableHighlight
              className="flex flex-1 justify-center items-center flex-row bg-gray-600 rounded-lg p-2 text-center mr-1"
              onPress={() => {
                setModalVisible(false);

              }}
            >
              <Text className="ml-2 text-center text-white">Cancelar</Text>
            </TouchableHighlight>
            <TouchableHighlight
              className="flex flex-1 justify-center items-center flex-row bg-green-600 rounded-lg p-2 text-center ml-1"
              onPress={() => saveStore()}
            >
              <>
                <MaterialIcons name="save" size={22} color="white" />
                <Text className="ml-2 text-center text-white">Salvar</Text>
              </>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
}
