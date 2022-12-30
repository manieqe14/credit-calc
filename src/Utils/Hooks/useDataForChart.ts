import { useMemo } from 'react';
import { Installment, OptionsObj } from '../../components/types';
import { InitialValues } from '../initialValues';
import { useTranslation } from 'react-i18next';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useDataForChart = ({
  installments,
  options,
}: {
  installments: Installment[];
  options: OptionsObj;
}) => {
  const { t } = useTranslation();

  return useMemo(() => {
    const dataForChart = {
      type: 'line',
      data: {
        labels: installments.map(
          (obj) => `${obj.date.getMonth() + 1}.${obj.date.getFullYear()}`
        ),
        datasets: [
          {
            label: t('Installment rate'),
            data: installments.map((obj) => obj.value),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: t('Monthly payment'),
            data: installments.map((obj) => obj.amountPaid),
            borderColor: 'rgb(0, 0, 25)',
            backgroundColor: 'rgb(0, 0, 25)',
          },
        ],
      },
      options: {
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
    };

    if (options.constRateOverpayment) {
      dataForChart.data.datasets.push();
    }

    return dataForChart;
  }, [installments, options, t]);
};

export default useDataForChart;
