import React, { ReactElement } from 'react';
import Overpayments from '../Overpayments/Overpayments';
import Summary from '../Summary/Summary';
import Inputs from '../Inputs/Inputs';
import { Grid } from '@mui/material';
import Chart from '../Chart/Chart';
import Options from '../Options/Options';

const Root = (): ReactElement => {
  // TODO fetch current WIBOR
  // TODO overpayment number of occurrences switch
  // TODO custom start date -> hint -> today
  // TODO options provider

  return (
    <Grid container spacing={2}>
      <Inputs />
      <Options />
      <Overpayments />
      <Summary />
      <Chart />
    </Grid>
  );
};

export default Root;
