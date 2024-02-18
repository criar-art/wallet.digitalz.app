import { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import uuid from "react-native-uuid";
import * as SecureStore from "expo-secure-store";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState(new Date());
  const [dateString, setDateString] = useState(new Date().toLocaleDateString());
  const [result, setResult] = useState([]);
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    setDateString(new Date(currentDate).toLocaleDateString());
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
    if(name && value && date && type) {
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
    setType("");
    setName("");
    setValue("");
    setDateString(new Date().toLocaleDateString());
    setDate(new Date());
  }, [modalVisible]);

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
        <View
          key={item.id}
          className="border-l-4 text-black mt-5 bg-white p-4 rounded-lg shadow-lg"
        >
          <TouchableHighlight
            className="scale-75 z-20 absolute top-0 right-0 m-2 flex justify-center items-center w-10 bg-gray-200 rounded-full p-2 text-center"
            onPress={() => remove(item.id)}
          >
            <MaterialCommunityIcons
              name="trash-can-outline"
              size={24}
              color="red"
            />
          </TouchableHighlight>
          <Text className="text-black">Tipo: {item.type}</Text>
          <Text className="text-black">Nome: {item.name}</Text>
          <Text className="text-black">Valor: {item.value}</Text>
          <View className="flex flex-row items-center">
            <MaterialIcons name="calendar-month" size={22} color="black" />
            <Text className="ml-2 text-black">
              Data: {new Date(item.date).toLocaleString()}
            </Text>
          </View>
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
          <Dropdown
            style={{
              margin: 5,
              marginBottom: 20,
              height: 40,
              borderBottomColor: "gray",
              borderBottomWidth: 0.5,
            }}
            data={dataType}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Selecione o tipo"
            value={type}
            onChange={(item) => {
              setType(item.value);
            }}
          />
          {show && (
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
            onPress={() => setShow(true)}
            className="flex flex-row mb-4 p-1 px-2 bg-white rounded-lg border-2 border-slate-400"
          >
            <MaterialIcons name="calendar-month" size={22} color="black" />
            <TextInput
              className="ml-2 text-black"
              placeholder="Data do registro"
              onChangeText={setDateString}
              value={dateString}
              editable={false}
            />
          </Pressable>
          <Text className="text-black mb-2">Nome</Text>
          <TextInput
            className="mb-4 p-1 px-2 bg-white rounded-lg border-2 border-slate-400"
            placeholder="Nome do registro"
            onChangeText={setName}
            value={name}
          />
          <Text className="text-black mb-2">Valor</Text>
          <TextInput
            className="mb-4 p-1 px-2 bg-white rounded-lg border-2 border-slate-400"
            placeholder="Valor do registro"
            onChangeText={setValue}
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
