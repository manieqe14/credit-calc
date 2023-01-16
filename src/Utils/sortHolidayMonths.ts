import { HolidayDate } from '../view/list/ListView.types';
import { sort } from 'ramda';

export const sortHolidayMonths = (months: HolidayDate[]): HolidayDate[] =>
  sort(
    (prev, curr) => prev.year - curr.year || prev.month - curr.month,
    months
  );
