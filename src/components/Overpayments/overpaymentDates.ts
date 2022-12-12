import { useEffect } from "react";
import { useInputDataContext } from "../../context/InputDataContext";
import { Overpayment, OverpaymentDate, Period } from "../types";
import { isNil } from 'ramda';

export const overpaymentDates = (endDate: Date, overpayments: Overpayment[]) => {

    const { overpaymentDatesHandler } = useInputDataContext();

useEffect(() => {
    if (isNil(overpaymentDatesHandler)) {
      return;
    }
    const result: OverpaymentDate[] = [];
    for (const overpaymentObj of overpayments) {
      if (
        overpaymentObj.repeatPeriod !== undefined &&
        overpaymentObj.occurrences !== undefined
      ) {
        const loopDate = new Date(overpaymentObj.date);
        let occurrencesCounter = 0;
        while (
          loopDate.getTime() < endDate.getTime() &&
          occurrencesCounter < overpaymentObj.occurrences
        ) {
          result.push({
            date: new Date(loopDate),
            value: overpaymentObj.value,
          });
          occurrencesCounter++;
          switch (overpaymentObj.repeatPeriod) {
            case Period.MONTH:
              loopDate.setMonth(loopDate.getMonth() + 1);
              break;
            case Period.QUARTER:
              loopDate.setMonth(loopDate.getMonth() + 3);
              break;
            case Period.YEAR:
              loopDate.setFullYear(loopDate.getFullYear() + 1);
              break;
            default:
              loopDate.setFullYear(loopDate.getFullYear() + 1);
              break;
          }
        }
      } else {
        result.push({ date: overpaymentObj.date, value: overpaymentObj.value });
      }
    }

    overpaymentDatesHandler(
      result.sort((date1, date2) => date1.date.getTime() - date2.date.getTime())
    );
  }, [overpayments, endDate]);
}