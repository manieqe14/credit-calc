import { useEffect, useState } from "react";
import { countInstallment, odsetki } from "../Helpers";
import { Installment, OptionsObj, UserInputs } from "../../components/Credit/types";
import { OverpaymentDate } from "../../components/Credit/Overpayments";

const useInstallmentsCount = ({
                                dates,
                                userInputs,
                                options,
                                overpaymentDates
                              }: { dates: Date[], userInputs: UserInputs, options: OptionsObj, overpaymentDates: OverpaymentDate[] }): Installment[] => {

  const [installments, setInstallments] = useState<Installment[]>([]);

  useEffect(() => {
    let amountLeft: number = userInputs.amount.value;
    let overpaymentsLeft = overpaymentDates;
    const result: Installment[] = [];

    for (let index = 0; index < userInputs.period.value && amountLeft > 0; index++) {
      const rata: number = countInstallment(
        amountLeft,
        userInputs.wibor.value + userInputs.bankgross.value,
        userInputs.period.value - index
      );
      amountLeft = amountLeft - rata + odsetki(amountLeft, userInputs.bankgross.value + userInputs.wibor.value);
      while (
        (overpaymentsLeft.length > 0) &&
        overpaymentsLeft[0].date < dates[index]
        ) {
        amountLeft = amountLeft - overpaymentsLeft[0].value;
        overpaymentsLeft = overpaymentsLeft.slice(
          1,
          overpaymentsLeft.length
        );
      }

      if (options.constRateOverpayment) {
        amountLeft = amountLeft - options.constRateOverpaymentValue + rata;
      }
      result.push({ value: rata, date: dates[index] });
    }
    setInstallments(result);
  }, [userInputs, options, overpaymentDates]);

  return installments;
};

export default useInstallmentsCount;