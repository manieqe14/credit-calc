export const generateDatesArray = (date: Date, amount: number): Date[] =>
  Array.from(Array(amount), (_, index) => generateDate(date, index));

export const generateDate = (date: Date, months: number): Date => {
  const newDate = new Date(date);
  newDate.setMonth(date.getMonth() + months);
  return newDate;
};
