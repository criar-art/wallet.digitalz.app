import {
  parse,
  isBefore,
  format,
  isToday,
  isTomorrow,
  compareDesc,
  isValid,
} from "date-fns";

export const formatDate = (dateStr: string): string => {
  let parsedDate: Date | null = null;
  const possibleFormats = [
    "yyyy-MM-dd",
    "MM/dd/yyyy",
    "dd/MM/yyyy",
    "dd-MM-yyyy",
    "MM-dd-yyyy",
  ];

  for (const fmt of possibleFormats) {
    parsedDate = parse(dateStr, fmt, new Date());
    if (isValid(parsedDate)) {
      break;
    }
  }

  if (!parsedDate || !isValid(parsedDate)) {
    throw new Error("Invalid date format");
  }

  return format(parsedDate, "dd/MM/yyyy");
};

export const isDatePast = (dateStr: string): boolean => {
  const formattedDateStr = formatDate(dateStr);
  const parsedDate = parse(formattedDateStr, "dd/MM/yyyy", new Date());

  // Ignorar horas, minutos e segundos na comparação
  const today = new Date();
  const todayWithoutTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  return isBefore(parsedDate, todayWithoutTime);
};

export const formatDateString = (date: Date): string => {
  return format(date, "dd/MM/yyyy");
};

export const isDateToday = (date: string): boolean => {
  return isToday(formatDate(date));
};

// Função para verificar se uma data fornecida é o dia de amanhã
export const isDateTomorrow = (date: string): boolean => {
  const parsedDate = formatDate(date);
  return isTomorrow(parsedDate);
};

export const sortDataByDateDesc = (
  data: any[],
  dateFormat: string = "dd/MM/yyyy"
) => {
  return data.sort((a, b) => {
    const dateA = parse(a.date, dateFormat, new Date());
    const dateB = parse(b.date, dateFormat, new Date());
    return compareDesc(dateA, dateB);
  });
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
      return colorScheme === "dark" ? "#111" : "#ddd";
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

export const renderBackgroundClass = (
  type: string,
  date: string,
  isPay: boolean
): string => {
  let colorClass = "";

  const todayColors: any = {
    expense: "bg-red-100 dark:bg-red-600",
    entry: "bg-green-100 dark:bg-green-600",
    investiment: "bg-blue-100 dark:bg-blue-600",
  };

  const tomorrowColors: any = {
    expense: "bg-red-200 dark:bg-red-800",
    entry: "bg-green-200 dark:bg-green-800",
    investiment: "bg-blue-200 dark:bg-blue-800",
  };

  const pastColors: any = {
    expense: "bg-red-300 dark:bg-red-900",
    entry: "bg-green-300 dark:bg-green-900",
    investiment: "bg-blue-300 dark:bg-blue-900",
  };
  if (isPay) {
    colorClass = "";
  } else if (isDateToday(date)) {
    colorClass = todayColors[type] || "";
  } else if (isDateTomorrow(date)) {
    colorClass = tomorrowColors[type] || "";
  } else if (isDatePast(date)) {
    colorClass = pastColors[type] || "";
  }

  return colorClass;
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
