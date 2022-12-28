import React, { ReactElement } from 'react';
import Options from '../Options/Options';
import Overpayments from '../Overpayments/Overpayments';
import Summary from '../Summary/Summary';
import Inputs from '../Inputs/Inputs';
import StoreContext from '../../context/store.context';
import { Grid } from '@mui/material';
import Store from '../../store/store';
import Chart from '../Chart/Chart';

interface RootProps {
  store: Store;
}

const Root = ({ store }: RootProps): ReactElement => {
  // TODO fetch current WIBOR
  // TODO overpayment number of occurrences switch
  // TODO custom start date -> hint -> today
  // TODO wakacje kredytowe
  // TODO options provider
  // TODO save data in storage

  return (
    <StoreContext.Provider value={store}>
      <Grid container spacing={2}>
        <Inputs />
        <Options />
        <Overpayments />
        <Summary />
        <Chart />
      </Grid>
    </StoreContext.Provider>
  );
};

export default Root;
