import {
  parse,
  isBefore,
  format,
  isToday,
  isTomorrow,
  compareDesc,
  isValid,
} from "date-fns";
import { templateDate } from "./locale";

export const formatDate = (dateStr: string): string => {
  let parsedDate: Date | null = null;
  const possibleFormats = [
    "dd.MM.yyyy",
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

  return format(parsedDate, templateDate);
};

export const isDatePast = (dateStr: string): boolean => {
  const formattedDateStr = formatDate(dateStr);
  const parsedDate = parse(formattedDateStr, templateDate, new Date());

  // Ignorar horas, minutos e segundos na comparação
  const today = new Date();
  const todayWithoutTime = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  return isBefore(parsedDate, todayWithoutTime);
};

export const formatDateString = (date: Date): string => {
  return format(date, templateDate);
};

export const isDateToday = (dateStr: string): boolean => {
  const parsedDate = parse(dateStr, templateDate, new Date());
  return isToday(parsedDate);
};

// Função para verificar se uma data fornecida é o dia de amanhã
export const isDateTomorrow = (dateStr: string): boolean => {
  const parsedDate = parse(dateStr, templateDate, new Date());
  return isTomorrow(parsedDate);
};

export const sortDataByDateDesc = (
  data: any[],
  dateFormat: string = templateDate
) => {
  return [...data].sort((a, b) => {
    const dateA = parse(a.date, dateFormat, new Date());
    const dateB = parse(b.date, dateFormat, new Date());
    return compareDesc(dateA, dateB);
  });
};
