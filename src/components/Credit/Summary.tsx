import { rounder } from "../../Utils/Helpers";
import React from "react";

const Summary: React.FC<{ gross: number, totalCost: number }> = ({ gross, totalCost }) => {
  return (
    <div className="card-sm h-fit">
      <div className="flex-container w-equal-2">
        <span>Sumaryczne oprocentowanie</span>
        <span>
                {rounder(gross)} %
              </span>
      </div>
      <div className="flex-container w-equal-2">
        <span>Total cost</span>
        <span>{rounder(totalCost)} PLN</span>
      </div>
    </div>);
};

export default Summary;