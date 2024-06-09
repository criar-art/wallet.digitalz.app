import { useEffect, useState } from "react";
import { useAppSelector } from "@store/hooks";
import utils from "@utils";
import { RootState } from "@store";

interface Totals {
  liquid: number;
  patrimony: number;
  entry: number;
  expenses: number;
  investment: number;
  paidExpenses: number;
}

export function useBalance() {
  const getRegistersExpenses = useAppSelector((state: RootState) => {
    const data = utils.getStateRegisters(state, "expense");
    return data?.registers;
  });

  const getRegistersEntrys = useAppSelector((state: RootState) => {
    const data = utils.getStateRegisters(state, "entry");
    return data?.registers;
  });

  const getRegistersInvestments = useAppSelector((state: RootState) => {
    const data = utils.getStateRegisters(state, "investment");
    return data?.registers;
  });

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

  function calcTotal(registers: any, type: string) {
    return registers
      ? registers
          .filter((item: any) => item.type === type && !item.pay)
          .reduce((acc: number, { value }: any) => acc + Number(value), 0)
      : 0;
  }

  const getTotal = (type: string): number => {
    switch (type) {
      case "expense":
        return getRegistersExpenses && calcTotal(getRegistersExpenses, type);
      case "entry":
        return getRegistersEntrys && calcTotal(getRegistersEntrys, type);
      case "investment":
        return (
          getRegistersInvestments && calcTotal(getRegistersInvestments, type)
        );
      default:
        return 0;
    }
  };

  const getPaidExpensesTotal = (): number =>
    [...getRegistersExpenses]
      .filter((item: any) => item.type === "expense" && item.pay)
      .reduce((acc: number, { value }: any) => acc + Number(value), 0);

  const [totals, setTotals] = useState<Totals>({
    liquid: 0,
    patrimony: 0,
    entry: 0,
    expenses: 0,
    investment: 0,
    paidExpenses: 0,
  });

  useEffect(() => {
    const entryTotal = getTotal("entry");
    const expenseTotal = getTotal("expense");
    const investmentTotal = getTotal("investment");
    const paidExpensesTotal = getPaidExpensesTotal();
    const liquid = entryTotal - expenseTotal;
    const patrimony = investmentTotal + liquid;

    setTotals({
      liquid,
      patrimony,
      entry: entryTotal,
      expenses: expenseTotal,
      investment: investmentTotal,
      paidExpenses: paidExpensesTotal,
    });
  }, [getRegistersExpenses, getRegistersEntrys, getRegistersInvestments]);

  function getLiquid(): number {
    return totals.entry - totals.expenses;
  }

  function getPatrimonyTotal(): number {
    return totals.patrimony;
  }

  return {
    totals,
    getTotal,
    getQuantity,
    getPatrimonyTotal,
    getLiquid,
    getFilteredTotal,
  };
}
