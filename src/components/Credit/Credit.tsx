import React, { ReactElement, useEffect, useMemo, useState } from "react";
import "./Credit.less";
import { Options } from "./Options";
import { Input } from "./Input";
import { OverpaymentDate, Overpayments } from "./Overpayments";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Title,
  LineElement,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";
import useDataForChart from "../../Utils/Hooks/useDataForChart";
import { OptionsObj, UserInputs } from "./types";
import useInstallmentsCount from "../../Utils/Hooks/useInstallmentsCount";
import { initialUserInputs } from "../../Utils/initialValues";
import Summary from "./Summary";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Title,
  Legend
);

const today = new Date();

const Credit = (): ReactElement => {
  const [userInputs, setUserInputs] = useState<UserInputs>(initialUserInputs);
  const [options, setOptions] = useState<OptionsObj>({
    constRateOverpayment: false,
    constRateOverpaymentValue: 0,
    startDate: today
  });
  const [totalCost, setTotalCost] = useState(0);
  const [overpaymentDates, setOverpaymentDates] = useState<OverpaymentDate[]>(
    []
  );

  const dates = useMemo<Date[]>(() => {
    return Array.from(Array(userInputs.period.value).keys()).map(
      (_value, index) => {
        const newDate = new Date(options.startDate);
        newDate.setMonth(newDate.getMonth() + index);
        return newDate;
      }
    );
  }, [userInputs.period, options.startDate]);

  const { installments, overpaymentsTotal } = useInstallmentsCount({
    dates,
    userInputs,
    options,
    overpaymentDates
  });
  const chartData = useDataForChart({ installments, options });

  const handleUserClick = (key: string, value: number): void => {
    type keyType = keyof typeof userInputs;
    const userKey = key as keyType;
    const newInput = userInputs[userKey];
    newInput.value = value;
    setUserInputs({ ...userInputs, [userKey]: newInput });
  };

  useEffect(() => {
    if (installments.length === 0) {
      return;
    }
    if (options.constRateOverpayment) {
      setTotalCost(
        installments.filter((inst) => inst.value > 0).length *
        options.constRateOverpaymentValue + overpaymentsTotal
      );
    } else {
      setTotalCost(installments.length * installments[0].value + overpaymentsTotal);
    }
  }, [options, chartData]);

  return (
    <>
      <section className="flex-container" style={{ flexWrap: "wrap" }}>
        <div style={{ flexDirection: "column" }}>
          <form className="card-sm">
            <h2>Inputs</h2>
            {Object.entries(userInputs).map((input) => {
              return (
                <Input
                  key={input[0]}
                  userInput={input[1]}
                  onChange={(value: number) => handleUserClick(input[0], value)}
                />
              );
            })}
          </form>
          <Options options={options} setOptionsHandler={setOptions} />
        </div>
        <Overpayments
          enddate={dates.at(-1) ?? new Date()}
          overpaymentDatesHandler={setOverpaymentDates}
        />
        <Summary gross={userInputs.wibor.value + userInputs.bankgross.value} totalCost={totalCost}
                 rates={installments.length} lastInstallmentDate={installments.at(-1)?.date} />
      </section>
      <div style={{ padding: "2rem" }}><Line {...chartData} /></div>
    </>
  );
};

export default Credit;
