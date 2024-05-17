export const intitialForm = {
  name: "",
  type: "",
  value: "",
  date: new Date().toLocaleDateString(),
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
