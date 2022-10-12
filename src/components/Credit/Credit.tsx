import React, { ReactElement, useEffect, useMemo, useState } from "react";
import "./Credit.less";
import {
  rounder
} from "../../Utils/Helpers";
import { Options } from "./Options";
import { Option } from "./Option";
import { OverpaymentDate, Overpayments } from "./Overpayments";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  LineElement
} from "chart.js";
import { Line } from "react-chartjs-2";
import useDataForChart from "../../Utils/Hooks/useDataForChart";
import { OptionsObj, UserInputs } from "./types";
import useInstallmentsCount from "../../Utils/Hooks/useInstallmentsCount";
import { initialUserInputs } from "../../Utils/initialValues";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

const today = new Date();

const Credit = (): ReactElement => {

  const [userInputs, setUserInputs] = useState<UserInputs>(initialUserInputs);

  const dates = useMemo<Date[]>(() => {
    return Array.from(Array(userInputs.period.value).keys()).map(
      (_value, index) => {
        const newDate = new Date(today);
        newDate.setMonth(today.getMonth() + index);
        return newDate;
      }
    );
  }, [userInputs.period]);

  const [totalCost, setTotalCost] = useState(0);

  const [options, setOptions] = useState<OptionsObj>({
    constRateOverpayment: false,
    constRateOverpaymentValue: 0
  });

  const [overpaymentDates, setOverpaymentDates] = useState<OverpaymentDate[]>(
    []
  );

  const installments = useInstallmentsCount({ dates, userInputs, options, overpaymentDates });
  const chartData = useDataForChart({ installments, options });

  const handleUserClick = (key: string, value: number): void => {
    type keyType = keyof typeof userInputs;
    const userKey = key as keyType;
    const newInput = userInputs[userKey];
    newInput.value = value;
    setUserInputs({ ...userInputs, [userKey]: newInput });
  };

  useEffect(() => {
    if (installments.length > 0) {
      if (options.constRateOverpayment) {
        setTotalCost(
          installments.filter((inst) => inst.value > 0).length *
          options.constRateOverpaymentValue
        );
      } else {
        setTotalCost(installments.length * installments[0].value);
      }
    }

  }, [options]);

  return (
    <>
      <section className="flex-container" style={{ flexWrap: "wrap" }}>
        <div style={{ flexDirection: "column" }}>
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
                {rounder(userInputs.wibor.value + userInputs.bankgross.value)} %
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
