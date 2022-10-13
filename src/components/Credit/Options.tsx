import React, { ChangeEvent, ReactElement, useState } from 'react';
import { getDateForInput } from '../../Utils/Helpers';
import { OptionsObj } from './types';

export const Options = ({
  options,
  setOptionsHandler,
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

  console.info(options.startDate);

  const setOptions = (): void => {
    setOptionsHandler({
      ...options,
      constRateOverpayment,
      constRateOverpaymentValue,
    });
  };

  const changeDateEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setStartDate(event.target.valueAsDate);
  };

  return (
    <div className="card-sm h-fit">
      <form>
        <div className="form-section">
          <h3 className="subtitle">Monthly amount</h3>
          <input
            checked={constRateOverpayment}
            type="checkbox"
            id="const-rate-monthly-overpayment"
            onChange={() => setConstRateOverpayment(!constRateOverpayment)}
          />
          <input
            disabled={!constRateOverpayment}
            type="number"
            value={constRateOverpaymentValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setConstRateOverpaymentValue(() => parseFloat(event.target.value))
            }
          />
          <button
            className="primary-button"
            disabled={!constRateOverpayment && constRateOverpaymentValue < 1}
            onClick={setOptions}
          >
            OK
          </button>
        </div>
        <div className="form-section">
          <label>Set custom start date</label>
          <input
            type="date"
            value={getDateForInput(startDate)}
            onChange={changeDateEventHandler}
          />
        </div>
      </form>
    </div>
  );
};
