// Registers

export interface Register {
  id: string;
  type: string;
  date: Date;
  name: string;
  value: number;
  pay: boolean;
}

export interface RegisterFilter {
  short: 'asc' | 'desc' | null;
  startDate: Date | null;
  endDate: Date | null;
  searchTerm: string;
  pay: boolean | null;
}

export interface PaginationTest {
  startIndex: number;
  endIndex: number;
}

// Common Types

export interface CommonState {
  registers: Array<Register>;
  registerFilter: RegisterFilter;
  pagination: PaginationTest;
}
