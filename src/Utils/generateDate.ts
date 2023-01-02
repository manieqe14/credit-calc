export const generateDate = (date: Date, months: number): Date => {
    const newDate = new Date();
    newDate.setMonth(date.getMonth() + months);
    return newDate;
}