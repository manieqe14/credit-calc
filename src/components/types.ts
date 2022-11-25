export interface OptionsObj {
  constRateOverpayment: boolean;
  constRateOverpaymentValue: number;
  startDate: Date;
}

export interface UserInput {
  name: string;
  value: number;
  unit: string;
  step: number;
}

export interface UserInputs {
  amount: UserInput;
  wibor: UserInput;
  bankgross: UserInput;
  period: UserInput;
}

export interface Installment {
  date: Date;
  value: number;
}

export interface CreditContext {
  installments: Installment[];
  totalCost: number;
}