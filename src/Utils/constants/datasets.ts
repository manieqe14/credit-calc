import { Theme } from '@mui/material';
import { DatasetsInterface } from '../../components/Chart/Chart.types';

export const Datasets: DatasetsInterface = {
  rate: {
    label: 'Installment rate',
    visible: true,
    data: 'value',
    colour: (theme: Theme) => theme.palette.primary.main,
    yAxisID: 'y',
  },
  monthlyPayment: {
    label: 'Monthly payment',
    visible: true,
    data: 'amountPaid',
    colour: (theme: Theme) => theme.palette.secondary.main,
    yAxisID: 'y',
  },
  interest: {
    label: 'Interest',
    visible: true,
    data: 'interest',
    colour: (theme: Theme) => '#f9c87c',
    yAxisID: 'y',
  },
  amountLeft: {
    label: 'Amount left',
    visible: true,
    data: 'amountLeft',
    colour: (theme: Theme) => '#662211',
    yAxisID: 'y1',
  },
};
