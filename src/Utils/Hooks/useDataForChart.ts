import { useMemo } from 'react';
import { Installment, OptionsInterface } from '../../components/types';
import { InitialValues } from '../initialValues';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material';
import { ChartProps } from 'react-chartjs-2';
import { Chart } from 'chart.js';

const useDataForChart = ({
  installments,
  options,
}: {
  installments: Installment[];
  options: OptionsInterface;
}): ChartProps<'line'> => {
  const { t } = useTranslation();
  const theme = useTheme();

  Chart.defaults.color = theme.palette.secondary.light;
  Chart.defaults.borderColor = theme.palette.primary.light;

  return useMemo<ChartProps<'line'>>(
    () => ({
      type: 'line',
      data: {
        labels: installments.map(
          (obj) => `${obj.date.getMonth() + 1}.${obj.date.getFullYear()}`
        ),
        datasets: [
          {
            label: t('Installment rate').toString(),
            data: installments.map((obj) => obj.value),
            backgroundColor: theme.palette.primary.main,
            borderColor: theme.palette.primary.main,
            yAxisID: 'y',
          },
          {
            label: t('Monthly payment').toString(),
            data: installments.map((obj) => obj.amountPaid),
            backgroundColor: theme.palette.secondary.main,
            borderColor: theme.palette.secondary.main,
            yAxisID: 'y',
          },
          {
            label: t('Amount left').toString(),
            data: installments.map((obj) => obj.amountLeft),
            backgroundColor: '#662211',
            borderColor: '#662211',
            yAxisID: 'y1',
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            position: 'top' as const,
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem): string =>
                `${tooltipItem.formattedValue} ${InitialValues.formValues.amount.unit}`,
            },
          },
        },
        scales: {
          y: {
            ticks: {
              callback: (value: string | number) =>
                `${value} ${InitialValues.formValues.amount.unit}`,
            },
          },
          y1: {
            position: 'right',
            ticks: {
              callback: (value: string | number) =>
                `${value} ${InitialValues.formValues.amount.unit}`,
            },
          },
        },
      },
    }),
    [installments, options, t]
  );
};

export default useDataForChart;
