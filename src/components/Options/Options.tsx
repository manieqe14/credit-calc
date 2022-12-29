import React, { ReactElement, useEffect, useReducer } from 'react';
import { getDateForInput } from '../../Utils/Helpers';
import { useStore } from '../../context/store.context';
import { Subtitle } from '../../view/titles/titles';
import TextInput from '../../view/inputs/textInput';
import CheckboxInput from '../../view/inputs/checkboxInput';
import { Wrapper } from '../../view/wrapper/wrapper';
import { Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { OptionsObj } from '../types';
import { optionsReducer } from '../../store/Options/OptionsReducer';
import optionsAction, { OptionsActionInterface } from '../../store/Options/OptionsAction';

const Options = (): ReactElement => {
  const store = useStore();
  const { userInputs, options, startDate } = store;
  const { constRateOverpayment, constRateOverpaymentValue } = options;
  const { t } = useTranslation();

  const [state, dispatch] = useReducer<
    React.Reducer<OptionsObj, OptionsActionInterface>
  >(optionsReducer, options, undefined);

  useEffect(() => {
    store.setOptions(state);
  }, [state]);

  return (
    <Wrapper>
      <Subtitle>{t('Options')}</Subtitle>
      <Grid style={{ marginLeft: '20px' }}>
        <Grid item sx={{ position: 'relative' }}>
          <CheckboxInput
            checked={constRateOverpayment}
            id="const-rate-monthly-overpayment"
            onChange={() =>
              dispatch(optionsAction.SetActive(!constRateOverpayment))
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
              dispatch(optionsAction.SetValue(event.target.value))
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
              dispatch(
                optionsAction.SetDate(event.target.valueAsDate ?? new Date())
              )
            }
          />
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default observer(Options);
