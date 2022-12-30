import { VacationDate } from '../view/list/ListView.types';

export const dateToId = (date: Date | VacationDate): string => {
  if (date instanceof Date) {
    return JSON.stringify({
      month: date.getMonth(),
      year: date.getFullYear(),
    });
  } else {
    return JSON.stringify(date);
  }
};

export const idToDate = (date: string): VacationDate => JSON.parse(date);
