import { always, compose, curry, map, prop, sum } from 'ramda';
import { InstallmentValue } from '../components/types';

export const rounder = (value: number): number => Math.round(value * 100) / 100;

const installment = (
  amount: number,
  gross: number,
  period: number
): InstallmentValue => {
  if (amount <= 0) {
    return { value: 0, interest: 0 };
  }

  let sum = 0;

  for (let i = 1; i < period; i++) {
    sum += Math.pow(1 + gross / 1200, -i);
  }

  const value = rounder(amount / sum);

  return { value, interest: interest(amount, gross) };
};

const holiday = curry(
  (installmentValue: InstallmentValue, holiday: boolean): InstallmentValue =>
    holiday ? map(always(0), installmentValue) : installmentValue
);

export const countInstallment = compose(holiday, installment);

function interest(value: number, gross: number): number {
  return rounder((((value * gross) / 100) * 30) / 365);
}

export function zeroPad(number: number): string {
  if (number.toString().length === 1) {
    return `0${number}`;
  } else {
    return number.toString();
  }
}

export const getDateForInput = (date: Date): string =>
  `${date.getFullYear()}-${zeroPad(date.getMonth() + 1)}-${zeroPad(
    date.getDate()
  )}`;

export const getFormattedDate = (date: Date): string =>
  `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

export const isNanOrZero = (value: any): boolean => {
  return isNaN(value) || value === 0;
};

export function sumProp<T extends object>(
  propName: string
): (array: T[]) => number {
  return compose(sum, map<T, number>(prop(propName) as (x: T) => number));
}
