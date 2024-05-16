export const formatDate = (date: string) => {
  const [day, month, year] = date.split("/").map(Number);
  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    throw new Error("Invalid date format");
  }
  return new Date(year, month - 1, day);
};

export const isDatePast = (date: string) => new Date() > formatDate(date);

export const renderBorderType = (type: string) => {
  switch (type) {
    case "liquid":
      return "border-yellow-400";
    case "patrimony":
      return "border-black";
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

export const renderColorType = (type: string) => {
  switch (type) {
    case "home":
      return "#ddd";
    case "liquid":
      return "rgb(250 204 21)";
    case "patrimony":
      return "rgb(0 0 0)";
    case "investiment":
      return "rgb(125 211 252)";
    case "entry":
      return "rgb(134 239 172)";
    case "expense":
      return "rgb(252 165 165)";
    case "vehicle":
      return "rgb(156 163 175)";
  }
};

export const renderBackgroundClass = (type: string, date: string) => {
  if (isDatePast(date)) {
    switch (type) {
      case "expense":
        return "bg-red-100";
      case "investiment":
        return "bg-blue-100";
      case "entry":
        return "bg-green-100";
      default:
        return "";
    }
  }
  return "";
};

export const types: any = {
  liquid: "Líquido",
  patrimony: "Patrimônio",
  investiment: "Investimento",
  entry: "Entrada",
  expense: "Despesa",
  vehicle: "Veículo",
};

export const capitalize = (s: string) =>
  s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

export const ckeckTypeTouchable = (type: string) => {
  switch (type) {
    case "liquid":
    case "patrimony":
      return false;
    default:
      return true;
  }
};

export const parseMoney = (value: any, eye?: boolean) => {
  return eye ? value : value.replace(/[.,0-9]/g, "*");
};
