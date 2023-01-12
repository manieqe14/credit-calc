import { useMemo } from 'react';
import { Installment, OptionsInterface } from '../../components/types';
import { InitialValues } from '../initialValues';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material';
import { ChartProps } from 'react-chartjs-2';
import { Chart, ChartDataset } from 'chart.js';
import { isColourType } from '../typeChecker';
import { compose, filter, map, propEq } from 'ramda';
import {
  DatasetInterface,
  DatasetsInterface,
} from '../../components/Chart/Chart.types';
import { Datasets } from '../constants/datasets';

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

  const getColour = (item: DatasetInterface): string =>
    isColourType(item.colour) ? theme.palette[item.colour].main : item.colour;

  const datasetMap = map((item: DatasetInterface) => ({
    ...item,
    label: t(item.label as string).toString(),
    data: installments.map<number>(
      (installment) => installment[item.data] as number
    ),
    backgroundColor: getColour(item),
    borderColor: getColour(item),
  }));

  const datasetProcessor = compose(datasetMap, filter(propEq('visible', true)));

  const chartDatasets: Array<ChartDataset<'line'>> = useMemo(
    () => Object.values(datasetProcessor(Datasets)),
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
            position: 'top' as const,
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem): string =>
                `${tooltipItem.formattedValue} ${InitialValues.formValues.amount.unit}`,
            },
          },
        },
        elements: {
          point: {
            radius: 5,
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
    [installments, options, chartDatasets]
  );
};

export default useDataForChart;
