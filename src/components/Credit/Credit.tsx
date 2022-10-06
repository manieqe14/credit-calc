import React, {
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Amount } from './Amount';
import './Credit.less';
import { Gross } from './Gross';
import { Period } from './Period';
import { Wibor } from './Wibor';
import { countIntallment, odsetki, rounder } from '../../Utils/Helpers';
import { Options } from './Options';

import { Overpayments } from './Overpayments';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

export interface OptionsObj {
  constRateOverpayment: boolean;
  constRateOverpaymentValue: number;
}

export interface OverpaymentObj {
  date: Date;
  repeatPeriod?: string;
  value: number;
}

const Credit = (): ReactElement => {
  const today = new Date();
  const [userInput, setUserInput] = useState({
    enteredAmount: 300000,
    enteredWibor: 6.5,
    enteredBankGross: 2.13,
    enteredPeriod: 25 * 12,
  });

  const [totalCost, setTotalCost] = useState(0);

  const [installment, setInstallment] = useState<number[]>(
    Array(userInput.enteredPeriod).fill(0)
  );

  const dates = useRef(
    Array.from(Array(userInput.enteredPeriod).keys()).map(
      () => new Date(today.setMonth(today.getMonth() + 1))
    )
  );

  const [options, setOptions] = useState<OptionsObj>({
    constRateOverpayment: false,
    constRateOverpaymentValue: installment[0],
  });

  const [overpayments, setOverpayments] = useState<OverpaymentObj[]>([]);

  /* const overpaymentDates = useMemo(() => {
                  const result = []
                  for (const overpayment of overpayments) {
                    const temp = overpayment.date
                    while (
                      overpayment.repeatPeriod &&
                      temp.getTime() < dates.current[dates.current.length - 1].getTime()
                    ) {
                      result.push({ date: temp, value: overpayment.value })
                      if (overpayment.repeatPeriod === 'month') {
                        temp.setMonth(temp.getMonth() + 1)
                      } else if (overpayment.repeatPeriod === 'year') {
                        temp.setFullYear(temp.getFullYear() + 1)
                      }
                    }
                  }
                  console.log('result', result)
                  return result
                }, [overpayments]) */

  const dataForChart = useMemo(() => {
    const temp = {
      labels: dates.current
        .map((date) => `${date.getMonth() + 1}.${date.getFullYear()}`)
        .slice(0, installment.filter((installment) => installment > 0).length),
      datasets: [
        {
          label: 'Installment rate',
          data: installment.filter((installment) => installment > 0),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };
    const labelForOverPayment = 'Kwota płacona';

    if (options.constRateOverpayment) {
      temp.datasets.push({
        label: labelForOverPayment,
        data: Array(userInput.enteredPeriod)
          .fill(options.constRateOverpaymentValue)
          .slice(
            0,
            installment.filter((installment) => installment > 0).length
          ),
        borderColor: 'rgb(0, 0, 25)',
        backgroundColor: 'rgb(0, 0, 25)',
      });
    }
    return temp;
  }, [installment, dates, options]);

  useEffect(() => {
    let amountLeft = userInput.enteredAmount;
    // const totalCostLocal = 0
    setInstallment(
      installment.map((_current, index) => {
        if (amountLeft > 0) {
          const rata = countIntallment({
            ...userInput,
            enteredAmount: amountLeft,
            enteredPeriod: userInput.enteredPeriod - index,
          });
          amountLeft =
            amountLeft -
            rata +
            odsetki(
              amountLeft,
              userInput.enteredBankGross + userInput.enteredWibor
            );
          if (options.constRateOverpayment) {
            amountLeft = amountLeft - options.constRateOverpaymentValue + rata;
          }

          return rata;
        } else return 0;
      })
    );
    if (options.constRateOverpayment) {
      setTotalCost(
        installment.filter((inst) => inst > 0).length *
          options.constRateOverpaymentValue
      );
    } else {
      setTotalCost(installment.reduce((partial, element) => partial + element));
    }
  }, [userInput, options]);

  return (
    <div>
      <div className="flex-container">
        <form className="card-sm">
          <Amount
            value={userInput.enteredAmount}
            onAmountChange={(value: number) =>
              setUserInput({
                ...userInput,
                enteredAmount: value,
              })
            }
          />
          <Gross
            value={userInput.enteredBankGross}
            onGrossChange={(value: number) =>
              setUserInput({
                ...userInput,
                enteredBankGross: value,
              })
            }
          />
          <Wibor
            value={userInput.enteredWibor}
            onWiborChange={(value: number) =>
              setUserInput({
                ...userInput,
                enteredWibor: value,
              })
            }
          />
          <Period
            value={userInput.enteredPeriod}
            onPeriodChange={(value: number) =>
              setUserInput({
                ...userInput,
                enteredPeriod: value,
              })
            }
          />
        </form>
        <div className="card-sm h-fit">
          <div className="flex-container w-equal-2">
            <span>Sumaryczne oprocentowanie</span>
            <span>
              {rounder(userInput.enteredWibor + userInput.enteredBankGross)} %
            </span>
          </div>
          <div className="flex-container w-equal-2">
            <span>Total cost</span>
            <span>{rounder(totalCost)} PLN</span>
          </div>
        </div>
      </div>

      <div>{<Line data={dataForChart} />}</div>
      <Options options={options} setOptionsHandler={setOptions} />
      <Overpayments
        overpayments={overpayments}
        overpaymentsHandler={setOverpayments}
      />
    </div>
  );
};

export default Credit;
