import { isBefore, isToday, isTomorrow, compareDesc, format } from "date-fns";
import { templateDate } from "./locale";

export const formatDate = (date: Date): string => {
  return format(date, templateDate);
};

export const isDatePast = (date: Date): boolean => {
  // Ignorar horas, minutos e segundos na comparação
  const today = new Date();
  const todayWithoutTime = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  return isBefore(date, todayWithoutTime);
};

export const isDateToday = (date: Date): boolean => {
  return isToday(date);
};

// Função para verificar se uma data fornecida é o dia de amanhã
export const isDateTomorrow = (date: Date): boolean => {
  return isTomorrow(date);
};

export const sortDataByDateDesc = (data: any[]) => {
  return [...data].sort((a, b) => {
    const dateA = a.date;
    const dateB = b.date;
    return compareDesc(dateA, dateB);
  });
};
