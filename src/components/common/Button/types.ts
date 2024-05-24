import { GestureResponderEvent } from "react-native";

export type Props = {
  testID?: string;
  textColor?: string;
  twClass?: string;
  text?: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  pressableButton?: boolean;
  accessibilityState?: any;
  onPress?: ((event: GestureResponderEvent) => void);
  children?: React.ReactElement | React.ReactElement[] | React.ReactNode;
}
