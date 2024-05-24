export type Props = {
  testID?: string;
  twClass?: string;
  closeAction: () => void;
  cancelAction?: () => void;
  confirmAction?: () => void;
  closeModal?: () => void;
  confirmButton?: any;
  cancelButton?: any;
}
