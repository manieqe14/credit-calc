export const rounder = (value) => Math.round(value * 100) / 100;

export function countIntallment({
  enteredAmount,
  enteredWibor,
  enteredBankGross,
  enteredPeriod,
}) {
  let sum = 0;
  for (let i = 1; i < enteredPeriod; i++) {
    sum += Math.pow(1 + (enteredWibor + enteredBankGross) / 1200, -i);
  }
  return rounder(enteredAmount / sum);
}

export function odsetki(value, percent) {
  return (((value * percent) / 100) * 30) / 365;
}

export function zeroPad(number) {
  if (number.toString().length === 1) {
    return `0${number}`;
  } else {
    return number.toString();
  }
}
