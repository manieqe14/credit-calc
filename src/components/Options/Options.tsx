import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { getDateForInput, isNanOrZero } from '../../Utils/Helpers';
import { OptionsObj } from '../types';
import { useInputDataContext } from '../../context/InputDataContext';
import { Subtitle } from '../../view/titles/titles';
import TextInput from '../../view/inputs/textInput';

export const Options = ({
  setOptionsHandler,
}: {
  setOptionsHandler: (options: OptionsObj) => void;
}): ReactElement => {
  const { formValues, options } = useInputDataContext();
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
      constRateOverpaymentValue,
    });
  }, [constRateOverpayment, constRateOverpaymentValue, startDate]);

  const changeDateEventHandler = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    event.preventDefault();
    if (event.target.valueAsDate != null) {
      setStartDate(event.target.valueAsDate);
    }
  };

  return (
    <div>
      <Subtitle>Options</Subtitle>
      <form>
        <div>
          <input
            checked={constRateOverpayment}
            type="checkbox"
            id="const-rate-monthly-overpayment"
            onChange={() => setConstRateOverpayment(!constRateOverpayment)}
          />
          <TextInput
            disabled={!constRateOverpayment}
            className={
              constRateOverpayment && isNanOrZero(constRateOverpaymentValue)
                ? 'no-validated'
                : ''
            }
            label="Monthly payment"
            id="const-rate-overpayment-value"
            type="number"
            value={constRateOverpaymentValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setConstRateOverpaymentValue(() => parseFloat(event.target.value))
            }
          />
          {formValues.amount.unit}
        </div>
        <div>
          <TextInput
            id="overpayment-date"
            label="Set custom start date"
            type="date"
            value={getDateForInput(startDate)}
            onChange={changeDateEventHandler}
          />
        </div>
      </form>
    </div>
  );
};
