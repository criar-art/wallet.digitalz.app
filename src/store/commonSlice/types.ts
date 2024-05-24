interface Register {
  id: string;
  type: string;
  date: string;
  name: string;
  value: number;
  pay: boolean;
  // Outros campos, se houver
}

export interface common {
  registers: Array<Register>;
  registerData: any;
  eyeStatus: boolean;
  registerFilter: any;
}
