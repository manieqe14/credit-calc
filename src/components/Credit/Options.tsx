import React, { ChangeEvent, ReactElement, useEffect, useState } from "react";
import { getDateForInput } from "../../Utils/Helpers";
import { OptionsObj } from "./types";

export const Options = ({
                          options,
                          setOptionsHandler
                        }: {
  options: OptionsObj;
  setOptionsHandler: (options: OptionsObj) => void;
}): ReactElement => {
  const [constRateOverpayment, setConstRateOverpayment] = useState(
    options.constRateOverpayment
  );
  const [constRateOverpaymentValue, setConstRateOverpaymentValue] = useState(
    options.constRateOverpaymentValue
  );

  const [startDate, setStartDate] = useState(options.startDate);

  useEffect(() => {
    setOptionsHandler({
      ...options,
      startDate,
      constRateOverpayment,
      constRateOverpaymentValue
    });
  }, [constRateOverpayment, constRateOverpaymentValue, startDate]);

  const changeDateEventHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    if (event.target.valueAsDate != null) {
      setStartDate(event.target.valueAsDate);
    }
  };

  return (
    <div className="card-sm h-fit">
      <h2>Options</h2>
      <form>
        <div className="form-section">
          <label htmlFor="constRateOverpaymentValue">Monthly payment</label>
          <input
            checked={constRateOverpayment}
            type="checkbox"
            id="const-rate-monthly-overpayment"
            onChange={() => setConstRateOverpayment(!constRateOverpayment)}
          />
          <input
            disabled={!constRateOverpayment}
            id="constRateOverpaymentValue"
            type="number"
            value={constRateOverpaymentValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setConstRateOverpaymentValue(() => parseFloat(event.target.value))
            }
          />
        </div>
        <div className="form-section">
          <label htmlFor="overpayment-date">Set custom start date</label>
          <input
            id="overpayment-date"
            type="date"
            value={getDateForInput(startDate)}
            onChange={changeDateEventHandler}
          />
        </div>
      </form>
    </div>
  );
};
