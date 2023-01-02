import { HolidayDate } from '../view/list/ListView.types';

export const checkHolidayMonth = (
  holidays: HolidayDate[],
  current: Date
): boolean =>
  holidays.find(
    (month) =>
      month.month === current.getMonth() && month.year === current.getFullYear()
  ) !== undefined;