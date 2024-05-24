export type Props = {
  testID?: string;
  className?: string;
  label: string;
  value: string;
  onChangeDate: (value: string, type: string) => void;
  accessibilityLabel?: string;
  maximumDate?: any;
  minimumDate?: any;
}
