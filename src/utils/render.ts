import { isDatePast, isDateToday, isDateTomorrow } from "./date";

export const renderBorderType = (type: string): string => {
  switch (type) {
    case "liquid":
      return "border-yellow-400";
    case "patrimony":
      return "border-black dark:border-white";
    case "investment":
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
    case "investment":
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
  date: Date,
  isPay: boolean
): string => {
  let colorClass = "";

  const todayColors: any = {
    expense: "bg-red-100 dark:bg-red-600",
    entry: "bg-green-100 dark:bg-green-600",
    investment: "bg-blue-100 dark:bg-blue-600",
  };

  const tomorrowColors: any = {
    expense: "bg-red-200 dark:bg-red-800",
    entry: "bg-green-200 dark:bg-green-800",
    investment: "bg-blue-200 dark:bg-blue-800",
  };

  const pastColors: any = {
    expense: "bg-red-300 dark:bg-red-900",
    entry: "bg-green-300 dark:bg-green-900",
    investment: "bg-blue-300 dark:bg-blue-900",
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

export const renderIconMoney = (item: any) => {
  switch (item.type) {
    case "entry":
      return isDateToday(item.date) || isDatePast(item.date)
        ? "cash-check"
        : "cash-plus";
    case "expense":
      return item.pay ? "cash-check" : "cash-remove";
    case "investment":
      return isDateToday(item.date) || isDatePast(item.date)
        ? "cash-check"
        : "cash-lock";
    default:
      return "cash";
  }
};

export const renderIconCalendar = (item: any) => {
  switch (item.type) {
    case "entry":
      return isDateToday(item.date) || isDatePast(item.date)
        ? "calendar-check-o"
        : "calendar";
    case "expense":
      return item.pay ? "calendar-check-o" : "calendar-times-o";
    case "investment":
      return isDateToday(item.date) || isDatePast(item.date)
        ? "calendar-check-o"
        : "calendar";
    default:
      return "calendar";
  }
};

