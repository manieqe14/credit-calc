import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import './Credit.less';
import {
  countGross,
  countIntallment,
  odsetki,
  rounder,
} from '../../Utils/Helpers';
import { Options } from './Options';
import { Option } from './Option';
import { OverpaymentDate, Overpayments } from './Overpayments';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  LineElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

export interface OptionsObj {
  constRateOverpayment: boolean;
  constRateOverpaymentValue: number;
}

export interface UserInput {
  name: string;
  value: number;
  unit: string;
  step: number;
}

export interface UserInputs {
  amount: UserInput;
  wibor: UserInput;
  bankgross: UserInput;
  period: UserInput;
}

type Installment = {
  date: Date;
  value: number;
};

const userInputs: UserInputs = {
  amount: {
    name: 'Wartość kredytu',
    value: 300000,
    unit: 'zł',
    step: 1000,
  },
  wibor: {
    name: 'WIBOR',
    value: 6.5,
    unit: '%',
    step: 0.1,
  },
  bankgross: {
    name: 'Marża banku',
    value: 2.13,
    unit: '%',
    step: 0.1,
  },
  period: {
    name: 'Okres kreytowania',
    value: 25 * 12,
    unit: 'miesięcy',
    step: 1,
  },
};

const Credit = (): ReactElement => {
  const today = new Date();

  const [userInput, setUserInput] = useState<UserInputs>(userInputs);

  const dates = useMemo<Date[]>(() => {
    return Array.from(Array(userInput.period.value).keys()).map(
      () => new Date(today.setMonth(today.getMonth() + 1))
    );
  }, [userInput.period]);

  const [totalCost, setTotalCost] = useState(0);

  const [installment, setInstallment] = useState<Installment[]>(
    Array(userInput.period.value)
      .fill(
        countIntallment(
          userInput.amount.value,
          countGross(userInput),
          userInput.period.value
        )
      )
      .map(
        (obj, index) =>
          ({
            date: dates[index],
            value: obj,
          } as Installment)
      )
  );

  const [options, setOptions] = useState<OptionsObj>({
    constRateOverpayment: false,
    constRateOverpaymentValue: installment[0].value,
  });

  const [overpaymentDates, setOverpaymentDates] = useState<OverpaymentDate[]>(
    []
  );

  const chartData = useMemo(() => {
    const data = {
      labels: installment
        .slice(
          0,
          installment.filter((installment) => installment.value > 0).length
        )
        .map((obj) => `${obj.date.getMonth() + 1}.${obj.date.getFullYear()}`),
      datasets: [
        {
          label: 'Installment rate',
          data: installment
            .filter((installment) => installment.value > 0)
            .map((obj) => obj.value),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };
    const labelForOverPayment = 'Kwota płacona';

    if (options.constRateOverpayment) {
      data.datasets.push({
        label: labelForOverPayment,
        data: Array(userInput.period.value)
          .fill(options.constRateOverpaymentValue)
          .slice(
            0,
            installment.filter((installment) => installment.value > 0).length
          ),
        borderColor: 'rgb(0, 0, 25)',
        backgroundColor: 'rgb(0, 0, 25)',
      });
    }
    return data;
  }, [installment, dates, options]);

  const handleUserClick = (key: string, value: number): void => {
    type keyType = keyof typeof userInput;
    const userKey = key as keyType;
    const newInput = userInput[userKey];
    newInput.value = value;
    setUserInput({ ...userInput, [userKey]: newInput });
  };

  useEffect(() => {
    let amountLeft: number = userInput.amount.value;
    let overpaymentsLeft = overpaymentDates;
    setInstallment(
      installment.map((current, _index) => {
        if (amountLeft > 0) {
          const rata = countIntallment(
            amountLeft,
            userInputs.wibor.value + userInputs.bankgross.value,
            userInputs.period.value
          );

          amountLeft =
            amountLeft -
            rata +
            odsetki(
              amountLeft,
              userInput.bankgross.value + userInput.wibor.value
            );

          while (
            overpaymentsLeft.length &&
            overpaymentsLeft[0].date < current.date
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

          return { date: current.date, value: rata };
        } else return { date: current.date, value: 0 };
      })
    );
    if (options.constRateOverpayment) {
      setTotalCost(
        installment.filter((inst) => inst.value > 0).length *
          options.constRateOverpaymentValue
      );
    } else {
      setTotalCost(installment.length * installment[0].value);
    }
  }, [userInput, options, overpaymentDates]);

  return (
    <>
      <section className="flex-container" style={{ flexWrap: 'wrap' }}>
        <div style={{ flexDirection: 'column' }}>
          <div className="calc-table flex-container card-sm">
            {Object.entries(userInputs).map((input) => {
              return (
                <Option
                  key={input[0]}
                  userInput={input[1]}
                  onChange={(value: number) => handleUserClick(input[0], value)}
                />
              );
            })}
          </div>
          <div className="card-sm h-fit">
            <div className="flex-container w-equal-2">
              <span>Sumaryczne oprocentowanie</span>
              <span>
                {rounder(userInput.wibor.value + userInput.bankgross.value)} %
              </span>
            </div>
            <div className="flex-container w-equal-2">
              <span>Total cost</span>
              <span>{rounder(totalCost)} PLN</span>
            </div>
          </div>
          <Options options={options} setOptionsHandler={setOptions} />
        </div>
        <Overpayments
          enddate={dates.at(-1) ?? new Date()}
          overpaymentDatesHandler={setOverpaymentDates}
        />
      </section>

      <div>{<Line data={chartData} />}</div>
    </>
  );
};

export default Credit;
