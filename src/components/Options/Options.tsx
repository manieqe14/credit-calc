import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { getDateForInput } from '../../Utils/Helpers';
import { useStore } from "../../context/store.context";
import { Subtitle } from '../../view/titles/titles';
import TextInput from '../../view/inputs/textInput';
import CheckboxInput from '../../view/inputs/checkboxInput';
import { Wrapper } from '../../view/wrapper/wrapper';
import { Grid } from '@mui/material';
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

const Options = (): ReactElement => {
  const store = useStore();
  const { userInputs, options, startDate } = store;
  const { t } = useTranslation();
  const [constRateOverpayment, setConstRateOverpayment] = useState(
    options.constRateOverpayment
  );
  const [constRateOverpaymentValue, setConstRateOverpaymentValue] = useState(
    options.constRateOverpaymentValue
  );

  useEffect(() => {
    store.setOptions({
      ...options,
      constRateOverpayment,
      constRateOverpaymentValue,
    });
  }, [constRateOverpayment, constRateOverpaymentValue]);

  const changeDateEventHandler = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    event.preventDefault();
    if (event.target.valueAsDate != null) {
      store.startDate = event.target.valueAsDate;
    }
  };

  return (
    <Wrapper>
      <Subtitle>{t('Options')}</Subtitle>
      <Grid style={{ marginLeft: '20px' }}>
        <Grid item sx={{ position: 'relative' }}>
          <CheckboxInput
            checked={constRateOverpayment}
            id="const-rate-monthly-overpayment"
            onChange={() => setConstRateOverpayment(!constRateOverpayment)}
          />
          <TextInput
            disabled={!constRateOverpayment}
            label={t('Monthly payment')}
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
            label={t("Custom start date")}
            type="date"
            value={getDateForInput(startDate)}
            onChange={changeDateEventHandler}
          />
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default observer(Options);
