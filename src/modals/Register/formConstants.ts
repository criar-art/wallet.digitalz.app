import { format } from 'date-fns';

export const intitialForm = {
  name: "",
  type: "",
  value: "",
  date: format(new Date(), 'dd/MM/yyyy'),
};

export const initialFormError = {
  type: false,
  name: false,
  value: false,
};

export const dataType = [
  { label: "Investimento", value: "investiment" },
  { label: "Entrada", value: "entry" },
  { label: "Despesa", value: "expense" },
  // { label: "Veículo", value: "vehicle" },
];
