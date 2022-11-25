import { useEffect, useState } from 'react';
import { countInstallment, odsetki } from '../Helpers';
import { Installment, OptionsObj, UserInputs } from '../../components/types';
import { OverpaymentDate } from '../../components/Overpayments/Overpayments';

interface InstallmentsCountProps {
  dates: Date[];
  userInputs: UserInputs;
  options: OptionsObj;
  overpaymentDates: OverpaymentDate[];
}

const useInstallmentsCount = ({
  dates,
  userInputs,
  options,
  overpaymentDates,
}: InstallmentsCountProps): {
  installments: Installment[];
  overpaymentsTotal: number;
} => {
  const [installments, setInstallments] = useState<Installment[]>([]);
  const [overpaymentsTotal, setOverpaymentsTotal] = useState(0);

  useEffect(() => {
    if (overpaymentDates.length === 0) return;
    setOverpaymentsTotal(
      overpaymentDates.reduce((prev, current) => {
        return { value: current.value + prev.value, date: new Date() };
      }).value
    );
  }, [overpaymentDates]);

  useEffect(() => {
    let amountLeft: number = userInputs.amount.value;
    let overpaymentsLeft = overpaymentDates;
    const result: Installment[] = [];

    for (
      let index = 0;
      index < userInputs.period.value && amountLeft > 0;
      index++
    ) {
      const rata: number = countInstallment(
        amountLeft,
        userInputs.wibor.value + userInputs.bankgross.value,
        userInputs.period.value - index
      );
      amountLeft =
        amountLeft -
        rata +
        odsetki(
          amountLeft,
          userInputs.bankgross.value + userInputs.wibor.value
        );
      while (
        overpaymentsLeft.length > 0 &&
        overpaymentsLeft[0].date < dates[index]
      ) {
        amountLeft = amountLeft - overpaymentsLeft[0].value;
        overpaymentsLeft = overpaymentsLeft.slice(1, overpaymentsLeft.length);
      }

      if (options.constRateOverpayment) {
        amountLeft = amountLeft - options.constRateOverpaymentValue + rata;
      }
      result.push({ value: rata, date: dates[index] });
    }
    setInstallments(result);
  }, [userInputs, options, overpaymentDates]);

  return { installments, overpaymentsTotal };
};

export default useInstallmentsCount;