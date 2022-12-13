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

export type InputNames =  "amount" | "wibor" | "bankgross" | "period";

export type UserInputs = Record<InputNames, UserInput>;

export interface Installment {
  date: Date;
  value: number;
}

export enum Period {
  MONTH = 'month',
  QUARTER = 'quarter',
  YEAR = 'year',
}

export interface OverpaymentDate {
  date: Date;
  value: number;
}

export interface Overpayment extends OverpaymentDate {
  repeatPeriod?: Period | undefined;
  occurrences: number;
  uuid: string;
}