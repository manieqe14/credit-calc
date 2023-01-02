import { VacationDate } from '../view/list/ListView.types';

export const checkVacationMonth = (
  vacationMonths: VacationDate[],
  current: Date
): boolean =>
  vacationMonths.find(
    (vacationMonth) =>
      vacationMonth.month === current.getMonth() &&
      vacationMonth.year === current.getFullYear()
  ) !== undefined;