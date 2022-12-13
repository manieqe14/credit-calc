import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { getDateForInput } from '../../Utils/Helpers';
import { useStore } from "../../context/store.context";
import { Subtitle } from '../../view/titles/titles';
import TextInput from '../../view/inputs/textInput';
import CheckboxInput from '../../view/inputs/checkboxInput';
import { Wrapper } from '../../view/wrapper/wrapper';
import { Grid } from '@mui/material';

export const Options = (): ReactElement => {
  const store = useStore();
  const { userInputs, options } = store;
  const [constRateOverpayment, setConstRateOverpayment] = useState(
    options.constRateOverpayment
  );
  const [constRateOverpaymentValue, setConstRateOverpaymentValue] = useState(
    options.constRateOverpaymentValue
  );

  const [startDate, setStartDate] = useState(options.startDate);

  useEffect(() => {
    store.setOptions({
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
            suffix={userInputs.amount.unit}
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
