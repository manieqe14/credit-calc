import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { getDateForInput } from '../../Utils/Helpers';
import { OptionsObj } from '../types';
import { useInputDataContext } from '../../context/InputDataContext';
import { Subtitle } from '../../view/titles/titles';
import TextInput from '../../view/inputs/textInput';
import CheckboxInput from '../../view/inputs/checkboxInput';
import { Wrapper } from '../../view/wrapper/wrapper';
import { Grid } from '@mui/material';

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
    <Wrapper>
      <Subtitle>Options</Subtitle>
      <Grid>
        <Grid item sx={{ position: 'relative' }}>
          <CheckboxInput
            checked={constRateOverpayment}
            id="const-rate-monthly-overpayment"
            onChange={() => setConstRateOverpayment(!constRateOverpayment)}
          />
          <TextInput
            disabled={!constRateOverpayment}
            label="Monthly payment"
            id="const-rate-overpayment-value"
            suffix={formValues.amount.unit}
            type="number"
            value={constRateOverpaymentValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setConstRateOverpaymentValue(() => parseFloat(event.target.value))
            }
          />
        </Grid>
        <Grid item>
          <TextInput
            id="overpayment-date"
            label="Set custom start date"
            type="date"
            value={getDateForInput(startDate)}
            onChange={changeDateEventHandler}
          />
        </Grid>
      </Grid>
    </Wrapper>
  );
};
