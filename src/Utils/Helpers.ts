export const rounder = (value: number) : number => Math.round(value * 100) / 100;

export type dataForInstallment = {
  enteredAmount: number,
  enteredWibor: number,
  enteredBankGross: number,
  enteredPeriod: number
}

export function countIntallment(data: dataForInstallment) {
  let sum = 0;
  for (let i = 1; i < data.enteredPeriod; i++) {
    sum += Math.pow(1 + (data.enteredWibor + data.enteredBankGross) / 1200, -i);
  }
  return rounder(data.enteredAmount / sum);
}

export function odsetki(value: number, percent: number) : number {
  return (((value * percent) / 100) * 30) / 365;
}

export function zeroPad(number: number) : string {
  if (number.toString().length === 1) {
    return `0${number}`;
  } else {
    return number.toString();
  }
}
