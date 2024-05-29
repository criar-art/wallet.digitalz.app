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
