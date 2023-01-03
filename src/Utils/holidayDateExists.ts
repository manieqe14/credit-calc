import { HolidayDate } from '../view/list/ListView.types';

export const holidayDateExists = (
  holidayDates: HolidayDate[],
  date: HolidayDate
): boolean =>
  holidayDates.find(
    (holidayDate) =>
      date.month === holidayDate.month && date.year === holidayDate.year
  ) != null;

export const removeHolidayMonth = (
  holidayDates: HolidayDate[],
  date: HolidayDate
): HolidayDate[] =>
  holidayDates.filter(
    (holidayDate) =>
      date.month !== holidayDate.month || date.year !== holidayDate.year
  );
