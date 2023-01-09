import { HolidayDate } from '../view/list/ListView.types';

export interface OptionsInterface {
  constRateOverpayment: boolean;
  constRateOverpaymentValue: number;
  startDate: Date;
  holidayMonths: HolidayDate[];
}

export interface UserInputInterface {
  name: string;
  value: number;
  unit: string;
  step: number;
}

export type InputNames = 'amount' | 'wibor' | 'bankgross' | 'period';

export type UserInputs = Record<InputNames, UserInputInterface>;

export interface Installment {
  date: Date;
  value: number;
  amountPaid: number;
  amountLeft: number;
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

export type BannerVariant = 'success' | 'fail' | 'info';
