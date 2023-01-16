import { useMemo } from 'react';
import { Installment, OptionsInterface } from '../../components/types';
import { InitialValues } from '../initialValues';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material';
import { ChartProps } from 'react-chartjs-2';
import { Chart, ChartDataset } from 'chart.js';
import { compose, filter, map, propEq } from 'ramda';
import {
  DatasetInterface,
  DatasetsInterface,
} from '../../components/Chart/Chart.types';
import { chartTicksCallback } from '../chartTicksCallback';

const useDataForChart = ({
  installments,
  options,
  datasets,
}: {
  installments: Installment[];
  options: OptionsInterface;
  datasets: DatasetsInterface;
}): ChartProps<'line'> => {
  const { t } = useTranslation();
  const theme = useTheme();

  Chart.defaults.color = theme.palette.secondary.light;
  Chart.defaults.borderColor = theme.palette.primary.light;

  const datasetMap = map((item: DatasetInterface) => ({
    ...item,
    label: t(item.label as string).toString(),
    data: installments.map<number>(
      (installment) => installment[item.data] as number
    ),
    backgroundColor: item.colour(theme),
    borderColor: item.colour(theme),
  }));

  const datasetProcessor = compose(datasetMap, filter(propEq('visible', true)));

  const chartDatasets: Array<ChartDataset<'line'>> = useMemo(
    () => Object.values(datasetProcessor(datasets)),
    [installments, theme, datasets]
  );

  return useMemo<ChartProps<'line'>>(
    () => ({
      type: 'line',
      data: {
        labels: installments.map(
          (obj) => `${obj.date.getMonth() + 1}.${obj.date.getFullYear()}`
        ),
        datasets: chartDatasets,
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem): string =>
                `${tooltipItem.formattedValue} ${InitialValues.formValues.amount.unit}`,
            },
          },
        },
        scales: {
          ...((chartDatasets.find((item) => item.yAxisID === 'y') != null) && {
            y: {
              ticks: {
                callback: chartTicksCallback,
              },
            },
          }),
          ...((chartDatasets.find((item) => item.yAxisID === 'y1') != null) && {
            y1: {
              position: 'right',
              ticks: {
                callback: chartTicksCallback,
              },
            },
          }),
        },
      },
    }),
    [installments, options, chartDatasets]
  );
};

export default useDataForChart;
