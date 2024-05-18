export const formatDate = (date: string): Date => {
  const [day, month, year] = date.split("/").map(Number);
  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    throw new Error("Invalid date format");
  }
  return new Date(year, month - 1, day);
};

export const isDatePast = (date: string): boolean => {
  return new Date() > formatDate(date);
};

export const renderBorderType = (type: string): string => {
  switch (type) {
    case "liquid":
      return "border-yellow-400";
    case "patrimony":
      return "border-black dark:border-white";
    case "investiment":
      return "border-sky-400";
    case "entry":
      return "border-green-400";
    case "expense":
      return "border-red-400";
    case "vehicle":
      return "border-gray-400";
    default:
      return "";
  }
};

export const renderColorType = (type: string, colorScheme: string): string => {
  switch (type) {
    case "home":
      return "#ddd";
    case "liquid":
      return "rgb(250 204 21)";
    case "patrimony":
      return "rgb(0 0 0)";
    case "investiment":
      return colorScheme === "dark" ? "rgb(30 58 138)" : "rgb(191 219 254)";
    case "entry":
      return colorScheme === "dark" ? "rgb(20 83 45)" : "rgb(187 247 208)";
    case "expense":
      return colorScheme === "dark" ? "rgb(153 27 27)" : "rgb(254 202 202)";
    case "vehicle":
      return "rgb(156 163 175)";
    default:
      return "";
  }
};

export const renderBackgroundClass = (type: string, date: string): string => {
  if (isDatePast(date)) {
    switch (type) {
      case "expense":
        return "bg-red-100 dark:bg-red-900";
      case "investiment":
        return "bg-blue-100 dark:bg-blue-900";
      case "entry":
        return "bg-green-100 dark:bg-green-900";
      default:
        return "";
    }
  }
  return "";
};

export const types: { [key: string]: string } = {
  liquid: "Líquido",
  patrimony: "Patrimônio",
  investiment: "Investimento",
  entry: "Entrada",
  expense: "Despesa",
  vehicle: "Veículo",
};

export const capitalize = (s: string): string =>
  s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

export const checkTypeTouchable = (type: string): boolean => {
  switch (type) {
    case "liquid":
    case "patrimony":
      return false;
    default:
      return true;
  }
};

export const parseMoney = (value: string, eye?: boolean): string => {
  return eye ? value : value.replace(/[.,0-9]/g, "*");
};

export const getLabel = (options: any, route: any): string =>
  options.tabBarLabel !== undefined
    ? options.tabBarLabel
    : options.title !== undefined
    ? options.title
    : route.name;
