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

  Chart.defaults.color = theme.palette.primary.dark;

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
            backgroundColor: theme.palette.secondary.dark,
            borderColor: theme.palette.secondary.main,
          },
          {
            label: t('Monthly payment').toString(),
            data: installments.map((obj) => obj.amountPaid),
            backgroundColor: theme.palette.primary.main,
            borderColor: theme.palette.primary.dark,
          },
        ],
      },
      options: {
        backgroundColor: theme.palette.primary.light,
        plugins: {
          legend: {
            position: 'top' as const,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
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
