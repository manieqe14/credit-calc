import { useMemo } from "react";
import { Installment, OptionsObj } from "../../components/Credit/types";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useDataForChart = ({
                           installments,
                           options
                         }: ({ installments: Installment[], options: OptionsObj })) => {


  return useMemo(() => {
    const dataForChart = {
      type: "line",
      data: {
        labels: installments
          .map((obj) => `${obj.date.getMonth() + 1}.${obj.date.getFullYear()}`),
        datasets: [
          {
            label: "Installment rate",
            data: installments
              .map((obj) => obj.value),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)"
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            position: "top" as const
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };

    if (options.constRateOverpayment) {
      dataForChart.data.datasets.push({
        label: "Monthly payment",
        data: Array(installments.length)
          .fill(options.constRateOverpaymentValue),
        borderColor: "rgb(0, 0, 25)",
        backgroundColor: "rgb(0, 0, 25)"
      });
    }

    return dataForChart;
  }, [installments, options]);
};

export default useDataForChart;