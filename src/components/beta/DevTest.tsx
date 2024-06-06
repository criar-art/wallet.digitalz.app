import { View } from "react-native";
import Button from "@components/common/Button";
import { setRegister as setRegisterExpense } from "@store/expenseSlice";
import { setRegister as setRegisterEntry } from "@store/entrySlice";
import { setRegister as setRegisterInvestment } from "@store/investmentSlice";
import { setRegisterData } from "@store/commonSlice";
import { useAppDispatch } from "@store/hooks";
import { generateData } from "./test";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Função para exibir todos os dados armazenados no AsyncStorage
export const showAsyncStorageData = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);

    console.log("keys: ", keys);

    result.forEach(([key, value]) => {
      console.log(`${key}: ${value}`);
    });
  } catch (error) {
    console.error("Erro ao obter dados do AsyncStorage", error);
  }
};

export default function HomeScreen() {
  const dispatch = useAppDispatch();

  function GerarTest(type: string) {
    switch (type) {
      case "expense":
        dispatch(setRegisterExpense(generateData(type) as any));
        break;
      case "entry":
        dispatch(setRegisterEntry(generateData(type) as any));
        break;
      case "investment":
        dispatch(setRegisterInvestment(generateData(type) as any));
        break;
    }
  }

  async function Clean() {
    dispatch(setRegisterExpense([] as any));
    dispatch(setRegisterEntry([] as any));
    dispatch(setRegisterInvestment([] as any));
    dispatch(setRegisterData([] as any));

    try {
      await AsyncStorage.clear();
      console.log("AsyncStorage limpo com sucesso!");
    } catch (error) {
      console.error("Erro ao limpar o AsyncStorage:", error);
    }

    const keys = await AsyncStorage.getAllKeys();

    try {
      await AsyncStorage.multiRemove(keys);
      console.log("Chaves persistidas removidas com sucesso!");
    } catch (error) {
      console.error("Erro ao remover as chaves persistidas:", error);
    }
  }

  return (
    <View testID="dev-test">
      <Button
        label="teste"
        text="Gerar expense"
        onPress={() => GerarTest("expense")}
        twClass="bg-green-600 m-2"
      />
      <Button
        label="teste"
        text="Gerar entry"
        onPress={() => GerarTest("entry")}
        twClass="bg-green-600 m-2"
      />
      <Button
        label="teste"
        text="Gerar invetment"
        onPress={() => GerarTest("investment")}
        twClass="bg-green-600 m-2"
      />
      <Button
        label="teste"
        text="Mostrar Test"
        onPress={showAsyncStorageData}
        twClass="bg-blue-600 m-2"
      />
      <Button
        label="teste"
        text="Limpar Test"
        onPress={Clean}
        twClass="bg-red-600 m-2"
      />
    </View>
  );
}
