import React, { ReactElement } from 'react';
import { getDateForInput } from '../../Utils/Helpers';
import { useStore } from '../../context/store.context';
import { Subtitle } from '../../view/titles/titles';
import TextInput from '../../view/inputs/textInput';
import CheckboxInput from '../../view/inputs/checkboxInput';
import { Wrapper } from '../../view/wrapper/wrapper';
import { Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import Holidays from '../Holidays/Holidays';

const Options = (): ReactElement => {
  const store = useStore();
  const { userInputs, options, startDate, setOptions } = store;
  const { constRateOverpayment, constRateOverpaymentValue } = options;
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Subtitle>{t('Options')}</Subtitle>
      <Subtitle variant="overline">{t('Constant overpayments')}</Subtitle>
      <Grid style={{ marginLeft: '20px' }}>
        <Grid item sx={{ position: 'relative' }}>
          <CheckboxInput
            checked={constRateOverpayment}
            id="const-rate-monthly-overpayment"
            onChange={() =>
              setOptions({ constRateOverpayment: !constRateOverpayment })
            }
          />
          <TextInput
            disabled={!constRateOverpayment}
            label={t('Monthly payment')}
            id="const-rate-overpayment-value"
            suffix={userInputs.amount.unit}
            type="number"
            value={constRateOverpaymentValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setOptions({
                constRateOverpaymentValue: parseFloat(event.target.value),
              })
            }
          />
        </Grid>
        <Grid item>
          <TextInput
            id="overpayment-date"
            label={t('Custom start date')}
            type="date"
            value={getDateForInput(startDate)}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setOptions({ startDate: event.target.valueAsDate ?? new Date() })
            }
          />
        </Grid>
      </Grid>
      <Holidays />
    </Wrapper>
  );
};

export default observer(Options);
