import uuid from "react-native-uuid";

type Register = {
  id: string;
  type: string;
  date: Date;
  name: string;
  value: number;
  pay: boolean;
};

// Função para gerar registros dinâmicos com tipo diferente e IDs únicos
const generateRecords = (
  model: Register,
  count: number,
  type: string
): Register[] => {
  const generatedRecords: any[] = [];
  for (let i = 0; i < count; i++) {
    const id = uuid.v4(); // Adiciona um sufixo único ao ID
    generatedRecords.push({ ...model, id, type, name: `Test ${type}` });
  }
  console.log("generatedRecords: ", generatedRecords);
  return generatedRecords;
};

// Exemplo de uso
const model = {
  id: "1",
  type: "expense",
  date: new Date(),
  name: "teste",
  value: 200,
  pay: false,
};

const count = 20; // Quantidade desejada de registros
export const generateData = (type: string) =>
  generateRecords(model, count, type);
