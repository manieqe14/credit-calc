import { rounder } from '../../Utils/Helpers';
import React, { useEffect, useState } from 'react';
import { SummaryPropsInterface } from './Summary.types';
import { InitialValues } from '../../Utils/initialValues';
import { useInputDataContext } from '../../context/InputDataContext';
import { Wrapper } from '../../view/wrapper/wrapper';

const Summary: React.FC<SummaryPropsInterface> = ({
  installments,
  overpaymentsTotal,
}) => {
  const { formValues, options } = useInputDataContext();
  const [totalCost, setTotalCost] = useState(0);

  const gross = formValues.wibor.value + formValues.bankgross.value;
  const rates = installments.length;
  const lastInstallmentDate = installments.at(-1)?.date;

  useEffect(() => {
    if (installments.length === 0) {
      return;
    }
    if (options.constRateOverpayment) {
      setTotalCost(
        installments.filter((inst) => inst.value > 0).length *
          options.constRateOverpaymentValue +
          overpaymentsTotal
      );
    } else {
      setTotalCost(
        installments.length * installments[0].value + overpaymentsTotal
      );
    }
  }, [options]);

  return (
    <Wrapper>
      <h2>Summary</h2>
      <table>
        <tbody>
          <tr>
            <td>Total gross</td>
            <td>{rounder(gross)} %</td>
          </tr>
          <tr>
            <td>Total cost</td>
            <td>
              {rounder(totalCost)} {InitialValues.formValues.amount.unit}
            </td>
          </tr>
          <tr>
            <td>Rates</td>
            <td>{rates}</td>
          </tr>
          <tr>
            <td>Last day</td>
            <td>{lastInstallmentDate?.toLocaleDateString()}</td>
          </tr>
        </tbody>
      </table>
    </Wrapper>
  );
};

export default Summary;
