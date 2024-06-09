import { templateDate } from "@utils/date";
import { format } from "date-fns";

export const intitialForm = {
  name: "",
  type: "",
  value: "",
  date: format(new Date(), templateDate),
  pay: false,
};

export const initialFormError = {
  type: false,
  name: false,
  value: false,
};
