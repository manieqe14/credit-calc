import { rounder } from '../../Utils/Helpers';
import React from 'react';
import { InitialValues } from '../../Utils/initialValues';
import { useStore } from '../../context/store.context';
import { Wrapper } from '../../view/wrapper/wrapper';
import { Subtitle } from '../../view/titles/titles';
import { Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

const Summary: React.FC<{}> = () => {
  const rowWidth = 6;
  const store = useStore();
  const { t } = useTranslation();
  const { userInputs, totalCost, installments } = store;

  const gross = userInputs.wibor.value + userInputs.bankgross.value;
  const rates = installments.length;
  const lastInstallmentDate = installments.at(-1)?.date;

  return (
    <Wrapper sx={{ maxWidth: '500px' }}>
      <Subtitle>{t('Summary')}</Subtitle>
      <Grid container>
        <Grid item xs={rowWidth}>
          {t('Total gross')}
        </Grid>
        <Grid item xs={rowWidth}>
          {rounder(gross)} {InitialValues.formValues.bankgross.unit}
        </Grid>
        <Grid item xs={rowWidth}>
          {t('Total cost')}
        </Grid>
        <Grid item xs={rowWidth}>
          {rounder(totalCost)} {InitialValues.formValues.amount.unit}
        </Grid>
        <Grid item xs={rowWidth}>
          {t('Rates')}
        </Grid>
        <Grid item xs={rowWidth}>
          {rates}
        </Grid>
        <Grid item xs={rowWidth}>
          {t('Payment last day')}
        </Grid>
        <Grid item xs={rowWidth}>
          {lastInstallmentDate?.toLocaleDateString()}
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default observer(Summary);
