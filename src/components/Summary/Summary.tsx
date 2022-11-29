import { rounder } from '../../Utils/Helpers';
import React, { useEffect, useState } from 'react';
import { SummaryPropsInterface } from './Summary.types';
import { InitialValues } from '../../Utils/initialValues';
import { useInputDataContext } from '../../context/InputDataContext';
import { Wrapper } from '../../view/wrapper/wrapper';
import { Subtitle } from '../../view/titles/titles';
import { Grid } from '@mui/material';

const Summary: React.FC<SummaryPropsInterface> = ({
  installments,
  overpaymentsTotal,
}) => {
  const rowWidth = 6;
  const { formValues, options } = useInputDataContext();
  const [totalCost, setTotalCost] = useState(0);

  const gross = formValues.wibor.value + formValues.bankgross.value;
  const rates = installments.length;
  const lastInstallmentDate = installments.at(-1)?.date;

  useEffect(() => {
    if (installments.length === 0) {
      return;
    }
    if (options.constRateOverpayment) {
      setTotalCost(
        installments.filter((inst) => inst.value > 0).length *
          options.constRateOverpaymentValue +
          overpaymentsTotal
      );
    } else {
      setTotalCost(
        installments.length * installments[0].value + overpaymentsTotal
      );
    }
  }, [options]);

  return (
    <Wrapper>
      <Subtitle>Summary</Subtitle>
      <Grid container>
        <Grid item xs={rowWidth}>
          Total gross
        </Grid>
        <Grid item xs={rowWidth}>
          {rounder(gross)} {InitialValues.formValues.bankgross.unit}
        </Grid>
        <Grid item xs={rowWidth}>
          Total cost
        </Grid>
        <Grid item xs={rowWidth}>
          {rounder(totalCost)} {InitialValues.formValues.amount.unit}
        </Grid>
        <Grid item xs={rowWidth}>
          Rates
        </Grid>
        <Grid item xs={rowWidth}>
          {rates}
        </Grid>
        <Grid item xs={rowWidth}>
          Last day
        </Grid>
        <Grid item xs={rowWidth}>
          {lastInstallmentDate?.toLocaleDateString()}
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default Summary;
