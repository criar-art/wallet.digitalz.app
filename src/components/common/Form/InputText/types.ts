export type Props = {
  testID?: string;
  twClass?: string;
  inputClassName?: string;
  label?: string;
  placeholder?: string;
  icon?: any;
  value: string;
  accessibilityLabel?: string;
  onChangeText: (text: string) => void;
  error?: boolean;
}
