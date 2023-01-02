import { HolidayDate } from '../view/list/ListView.types';

export const sortHolidayMonths = (months: HolidayDate[]): HolidayDate[] =>
  [...months].sort(
    (prev, curr) => prev.year - curr.year || prev.month - curr.month
  );
