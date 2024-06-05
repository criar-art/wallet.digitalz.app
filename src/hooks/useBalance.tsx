import { useEffect, useState } from "react";
import { selectRegistersType } from "@store/commonSelects";
import { useSelector } from "react-redux";

interface Totals {
  liquid: number;
  patrimony: number;
  entry: number;
  expenses: number;
  investment: number;
  paidExpenses: number;
}

export function useBalance() {
  const getRegistersExpenses = useSelector(selectRegistersType("expense"));
  const getRegistersEntrys = useSelector(selectRegistersType("entry"));
  const getRegistersInvestments = useSelector(
    selectRegistersType("investment")
  );

  const getQuantity = (type: string) => {
    switch (type) {
      case "expense":
        return getRegistersExpenses.length;
      case "entry":
        return getRegistersEntrys.length;
      case "investment":
        return getRegistersInvestments.length;
      default:
        return 0;
    }
  };

  const getFilteredTotal = (filteredData: any[]): number => {
    return filteredData.reduce(
      (acc: number, { value }: any) => acc + Number(value),
      0
    );
  };

  const getTotal = (type: string): number => {
    let registers: any = [];

    switch (type) {
      case "expense":
        registers = [...getRegistersExpenses];
      case "entry":
        registers = [...getRegistersEntrys];
      case "investment":
        registers = [...getRegistersInvestments];
    }

    return registers.length
      ? registers
          .filter((item: any) => item.type === type && !item.pay)
          .reduce((acc: number, { value }: any) => acc + Number(value), 0)
      : 0;
  };

  const getPaidExpensesTotal = (): number =>
    [...getRegistersExpenses]
      .filter((item: any) => item.type === "expense" && item.pay)
      .reduce((acc: number, { value }: any) => acc + Number(value), 0);

  const [totals, setTotals] = useState<Totals>({
    liquid: getLiquid(),
    patrimony: getPatrimonyTotal(),
    entry: getTotal("entry"),
    expenses: getTotal("expense"),
    investment: getTotal("investment"),
    paidExpenses: getPaidExpensesTotal(),
  });

  useEffect(() => {
    setTotals({
      liquid: getLiquid(),
      patrimony: getPatrimonyTotal(),
      entry: getTotal("entry"),
      expenses: getTotal("expense"),
      investment: getTotal("investment"),
      paidExpenses: getPaidExpensesTotal(),
    });
  }, [getRegistersExpenses, getRegistersEntrys, getRegistersInvestments]);

  function getLiquid(): number {
    return totals?.entry - totals?.expenses;
  }

  function getPatrimonyTotal(): number {
    const liquidTotal = totals?.entry - totals?.expenses;
    return totals?.investment + liquidTotal;
  }

  return {
    totals,
    getTotal,
    getQuantity,
    getPatrimonyTotal,
    getLiquid,
    getPaidExpensesTotal,
    getFilteredTotal,
  };
}
