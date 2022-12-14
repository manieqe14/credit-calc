import { InitialValues } from './initialValues';
import { isNil } from 'ramda';

const KEY = 'creditCalcValues';
const DATE_KEYS = ['startDate', 'date'];

export const saveDataToStorage = (value: string | object): void => {
  localStorage.setItem(
    KEY,
    typeof value === 'string' ? value : JSON.stringify(value)
  );
};

export const loadDataFromStorage = (): typeof InitialValues | null => {
  const valuesFromStorage = localStorage.getItem(KEY);
  if (isNil(valuesFromStorage)) {
    return null;
  }

  return JSON.parse(valuesFromStorage, reviver);
};

export const clearStorageData = (): void => localStorage.removeItem(KEY);

const reviver = (key: string, value: any): typeof value | Date => {
  if (DATE_KEYS.includes(key)) {
    return new Date(value);
  }
  return value;
};
