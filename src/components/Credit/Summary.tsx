import { rounder } from "../../Utils/Helpers";
import React from "react";
import { initialUserInputs } from "../../Utils/initialValues";

const Summary: React.FC<{ gross: number, totalCost: number, rates: number, lastInstallmentDate: Date | undefined }> = ({
                                                                                                                         gross,
                                                                                                                         totalCost,
                                                                                                                         rates,
                                                                                                                         lastInstallmentDate
                                                                                                                       }) => {
  return (
    <div className="card-sm h-fit">
      <h2>Summary</h2>
      <table className="summary-table">
        <tbody>
        <tr>
          <td>Total gross</td>
          <td>
            {rounder(gross)} %
          </td>
        </tr>
        <tr>
          <td>Total cost</td>
          <td>{rounder(totalCost)} {initialUserInputs.amount.unit}</td>
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
    </div>);
};

export default Summary;