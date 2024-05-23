export type Props = {
  testID?: string;
  className?: string;
  isOpen: boolean;
  children?: React.ReactElement | React.ReactElement[] | React.ReactNode | React.ReactNode[];
  closeAction: () => void;
  confirmAction?: () => void;
  confirmButton?: any;
  cancelButton?: any;
  header?: any;
  alertModal?: any;
  type?: string;
  optional?: boolean;
}

export type ModalHandle = {
  startShake: () => void;
  closeModal: () => void;
};
