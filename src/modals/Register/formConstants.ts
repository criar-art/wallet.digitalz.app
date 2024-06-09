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
