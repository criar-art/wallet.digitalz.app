import {
  compareAsc,
  compareDesc,
  isAfter,
  isBefore,
  isWithinInterval,
  parse,
} from "date-fns";

interface RegisterFilter {
  short: string;
  startDate: string;
  endDate: string;
  searchTerm: string;
  pay: boolean | undefined;
}

export const getFilledItemsCount = (filter: RegisterFilter): number => {
  let count = 0;

  for (const key in filter) {
    if (filter.hasOwnProperty(key)) {
      const value = filter[key as keyof RegisterFilter];
      if (value !== "" && value !== undefined) {
        count++;
      }
    }
  }

  return count;
};

export const applyFilterData = (registers: any, filter: any) => {
  let result = [...registers];

  const parsedStartDate = filter?.startDate
    ? parse(filter.startDate, "dd/MM/yyyy", new Date())
    : null;

  const parsedEndDate = filter?.endDate
    ? parse(filter.endDate, "dd/MM/yyyy", new Date())
    : null;

  if (parsedStartDate && parsedEndDate) {
    if (isBefore(parsedEndDate, parsedStartDate)) {
      console.error("End date cannot be earlier than start date");
      return result;
    }

    result = result.filter((item) => {
      const itemDate = parse(item.date, "dd/MM/yyyy", new Date());
      return isWithinInterval(itemDate, {
        start: parsedStartDate,
        end: parsedEndDate,
      });
    });
  } else if (parsedStartDate) {
    result = result.filter((item) => {
      const itemDate = parse(item.date, "dd/MM/yyyy", new Date());
      return (
        isAfter(itemDate, parsedStartDate) ||
        itemDate.getTime() === parsedStartDate.getTime()
      );
    });
  } else if (parsedEndDate) {
    result = result.filter((item) => {
      const itemDate = parse(item.date, "dd/MM/yyyy", new Date());
      return (
        isBefore(itemDate, parsedEndDate) ||
        itemDate.getTime() === parsedEndDate.getTime()
      );
    });
  }

  if (filter?.searchTerm) {
    result = result.filter((item) =>
      item.name.toLowerCase().includes(filter.searchTerm.toLowerCase())
    );
  }

  if (filter?.short === "asc") {
    result.sort((a, b) => compareAsc(a.value, b.value));
  } else {
    result.sort((a, b) => compareDesc(a.value, b.value));
  }

  if (filter?.pay !== undefined) {
    result = result.filter((item) => item.pay === filter.pay);
  }

  return result;
};
