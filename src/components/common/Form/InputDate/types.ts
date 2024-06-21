export type Props = {
  testID?: string;
  twClass?: string;
  label: string;
  value: Date | null;
  onChangeDate: (value: Date | null) => void;
  accessibilityLabel?: string;
  maximumDate?: any;
  minimumDate?: any;
  error?: boolean;
}
