export const generateDatesArray = (date: Date, amount: number): Date[] => {
  return Array.from(Array(amount).keys()).map((_value, index) => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() + index);
    return newDate;
  });
};
