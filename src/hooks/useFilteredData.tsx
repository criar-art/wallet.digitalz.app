import { useState, useEffect } from "react";
import {
  parse,
  compareAsc,
  compareDesc,
  isWithinInterval,
  isBefore,
  isAfter,
} from "date-fns";
import { useAppSelector } from "@store/hooks";
import { RootState } from "@store";
import { selectRegistersType } from "@store/commonSlice";
import { useSelector } from "react-redux";

interface FilterOptions {
  type: string;
}

const useFilteredData = ({ type }: FilterOptions) => {
  const common = useAppSelector((state: RootState) => state.commonState);
  const getRegisters = useSelector(selectRegistersType(type));
  const [filteredData, setFilteredData] = useState<any[]>([]);

  useEffect(() => {
    const applyFilters = () => {
      let result = [...getRegisters];

      const parsedStartDate = common.registerFilter?.startDate
        ? parse(common.registerFilter?.startDate, "dd/MM/yyyy", new Date())
        : null;

      const parsedEndDate = common.registerFilter?.endDate
        ? parse(common.registerFilter?.endDate, "dd/MM/yyyy", new Date())
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

      if (common.registerFilter?.searchTerm) {
        result = result.filter((item) =>
          item.name
            .toLowerCase()
            .includes(common.registerFilter?.searchTerm.toLowerCase())
        );
      }

      if (common.registerFilter?.short === "asc") {
        result.sort((a, b) => compareAsc(a.value, b.value));
      } else {
        result.sort((a, b) => compareDesc(a.value, b.value));
      }

      if (common.registerFilter?.pay !== undefined) {
        result = result.filter(
          (item) => item.pay === common.registerFilter?.pay
        );
      }

      setFilteredData(result);
    };

    applyFilters();
  }, [common.registerFilter]);

  return {
    filteredData,
  };
};

export default useFilteredData;
