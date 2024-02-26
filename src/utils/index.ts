export const renderBorderType = (type: string) => {
  switch (type) {
    case "investiment":
      return "border-sky-400";
    case "entry":
      return "border-green-400";
    case "expense":
      return "border-red-400";
    case "vehicle":
      return "border-gray-400";
  }
};

export const types: any = {
  investiment: "Investimento",
  entry: "Entrada",
  expense: "Despesa",
  vehicle: "Veículo",
};

export const capitalize = (s: string) =>
  s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
