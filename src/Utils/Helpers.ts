export const rounder = (value: number): number => {
  return Math.round(value * 100) / 100;
};

export function countInstallment(
  amount: number,
  gross: number,
  period: number
): number {
  let sum = 0;
  for (let i = 1; i < period; i++) {
    sum += Math.pow(1 + gross / 1200, -i);
  }
  return rounder(amount / sum);
}

export function odsetki(value: number, percent: number): number {
  return (((value * percent) / 100) * 30) / 365;
}

export function zeroPad(number: number): string {
  if (number.toString().length === 1) {
    return `0${number}`;
  } else {
    return number.toString();
  }
}

export const getDateForInput = (date: Date): string => {
  return `${date.getFullYear()}-${zeroPad(date.getMonth() + 1)}-${zeroPad(date.getDate())}`;
};

export const isNanOrZero = (value: any): boolean => {
  return isNaN(value) || value === 0;
};
