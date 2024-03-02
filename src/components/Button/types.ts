import { GestureResponderEvent } from "react-native";

export type Props = {
  testID?: string;
  backgroundColor?: string;
  textColor?: string;
  className?: string;
  text?: string;
  icon?: React.ReactNode;
  onPress?: ((event: GestureResponderEvent) => void);
}
