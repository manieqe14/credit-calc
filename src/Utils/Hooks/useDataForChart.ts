import { useMemo } from "react";
import { DataForChart, Installment, OptionsObj } from "../../components/Credit/types";

const useDataForChart = ({
                           installments,
                           options
                         }: ({ installments: Installment[], options: OptionsObj })): DataForChart => {


  return useMemo(() => {
    const data: DataForChart = {
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
    };
    const labelForOverPayment = "Kwota płacona";

    if (options.constRateOverpayment) {
      data.datasets.push({
        label: labelForOverPayment,
        data: Array(installments.length)
          .fill(options.constRateOverpaymentValue),
        borderColor: "rgb(0, 0, 25)",
        backgroundColor: "rgb(0, 0, 25)"
      });
    }
    return data;
  }, [installments, options]);
};

export default useDataForChart;