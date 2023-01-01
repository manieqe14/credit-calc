import { isNil } from "ramda";
import { OverpaymentDate } from "../components/types";

export const overpaymentsForDate = (overpaymentDates: OverpaymentDate[], prev: Date | undefined, curr: Date): OverpaymentDate[] => (overpaymentDates.filter((overpayment) => {
        if (isNil(prev)) {
          return overpayment.date < curr;
        }

        return (
          overpayment.date > prev &&
          overpayment.date < curr
        );
      }));