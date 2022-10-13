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
      <div className="flex-container">
        <span>Total gross</span>
        <span>
                {rounder(gross)} %
              </span>
      </div>
      <div className="flex-container">
        <span>Total cost</span>
        <span>{rounder(totalCost)} {initialUserInputs.amount.unit}</span>
      </div>
      <div className="flex-container">
        <span>Rates</span>
        <span>{rates}</span>
      </div>
      <div className="flex-container">
        <span>Last day</span>
        <span>{lastInstallmentDate?.toDateString()}</span>
      </div>
    </div>);
};

export default Summary;