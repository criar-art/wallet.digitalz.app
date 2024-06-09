export interface Register {
  id: string;
  type: string;
  date: string;
  name: string;
  value: number;
  pay: boolean;
}

export interface PaginationTest {
  startIndex: number;
  endIndex: number;
}

export interface CommonState {
  registers: Array<Register>;
  registerFilter: any;
  pagination: PaginationTest;
}
