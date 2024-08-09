
export interface Transcation {
  id: string;
  name: string;
  value: number;
  date: Date | null;
}

export interface BudgetType {
  id: string;
  name: string;
  description: string;
  value: number;
  date_end: Date | null;
  date_create: Date | null;
  transactions: Array<Transcation>
}

export interface BudgetState {
  budgets: Array<BudgetType>;
}
