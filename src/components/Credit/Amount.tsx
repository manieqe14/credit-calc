import { BiPlus, BiMinus } from 'react-icons/bi';
import React, { ReactElement } from 'react';

export const Amount = ({
  value,
  onAmountChange,
}: {
  value: number;
  onAmountChange: (value: number) => void;
}): ReactElement => {
  return (
    <div className="flex-container w-equal-3">
      <label>Kwota</label>
      <div>
        <span>
          <BiMinus onClick={() => onAmountChange(value - 1000)} />
        </span>
        <input
          type="number"
          value={value}
          onChange={(event) => onAmountChange(parseFloat(event.target.value))}
        />
        <span>
          <BiPlus onClick={() => onAmountChange(value + 1000)} />
        </span>
      </div>
      <span>PLN</span>
    </div>
  );
};
