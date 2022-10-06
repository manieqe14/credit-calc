import { BiPlus, BiMinus } from 'react-icons/bi';
import { rounder } from '../../Utils/Helpers';
import React, { ReactElement } from 'react';

export const Gross = ({
  value,
  onGrossChange,
}: {
  value: number;
  onGrossChange: (value: number) => void;
}): ReactElement => {
  return (
    <div className="flex-container w-equal-3">
      <label>Marża banku</label>
      <div>
        <span>
          <BiMinus onClick={() => onGrossChange(rounder(value - 0.1))} />
        </span>
        <input
          type="number"
          min="0"
          step="0.01"
          value={value}
          onChange={(event) => onGrossChange(parseFloat(event.target.value))}
        />
        <span>
          <BiPlus onClick={() => onGrossChange(rounder(value + 0.1))} />
        </span>
      </div>
      <span>%</span>
    </div>
  );
};
