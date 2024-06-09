import { StyleProp, ViewStyle } from "react-native";

export type Props = {
  testID?: string;
  type: string;
  numColumns: number;
  columnWrapperStyle?: StyleProp<ViewStyle>;
  isNotEmpetyRegisters: () => boolean;
  keyExtractor: (item: any, index: number) => string;
  keyProp: string;
};

type SelectorType = {
  filtered: Array<any>; // Defina o tipo apropriado para o array filtrado
};

export type SelectorMapping = {
  [key in Props['type']]: SelectorType; // Usando a chave do tipo de Props para garantir consistência
};

