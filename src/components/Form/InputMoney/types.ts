export type Props = {
  testID?: string;
  className?: string;
  label: string;
  value: string;
  accessibilityLabel?: string;
  onValueChange: (values: { value: string }) => void;
  onChangeText: (text: string) => void;
  error?: boolean;
}
