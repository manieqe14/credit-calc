import { DatasetsInterface } from '../../components/Chart/Chart.types';

export const Datasets: DatasetsInterface = {
  rate: {
    label: 'Installment rate',
    visible: true,
    data: 'value',
    colour: 'primary',
    yAxisID: 'y',
  },
  monthlyPayment: {
    label: 'Monthly payment',
    visible: true,
    data: 'amountPaid',
    colour: 'secondary',
    yAxisID: 'y',
  },
  interest: {
    label: 'Interest',
    visible: true,
    data: 'interest',
    colour: '#f9c87c',
    yAxisID: 'y',
  },
  amountLeft: {
    label: 'Amount left',
    visible: true,
    data: 'amountLeft',
    colour: '#662211',
    yAxisID: 'y1',
  },
};
