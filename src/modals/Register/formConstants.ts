import { format } from 'date-fns';

export const intitialForm = {
  name: "",
  type: "",
  value: "",
  date: format(new Date(), 'dd/MM/yyyy'),
  pay: false,
};

export const initialFormError = {
  type: false,
  name: false,
  value: false,
};

export const dataType = [
  { label: "Despesa", value: "expense" },
  { label: "Entrada", value: "entry" },
  { label: "Investimento", value: "investment" },
  // { label: "Veículo", value: "vehicle" },
];
