export type Props = {
  testID?: string;
  twClass?: string;
  label: string;
  value: string;
  accessibilityLabel?: string;
  onValueChange: (values: { value: string }) => void;
  onChangeText: (text: string) => void;
  error?: boolean;
}
