import { GestureResponderEvent } from "react-native";

export type Props = {
  testID?: string;
  textColor?: string;
  className?: string;
  text?: string;
  label: string;
  icon?: React.ReactNode;
  pressableButton?: boolean;
  onPress?: ((event: GestureResponderEvent) => void);
}
