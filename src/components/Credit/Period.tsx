import { BiPlus, BiMinus } from 'react-icons/bi';
import { rounder } from '../../Utils/Helpers';
import React, { ReactElement } from 'react';

export const Period = ({
  value,
  onPeriodChange,
}: {
  value: number;
  onPeriodChange: (value: number) => void;
}): ReactElement => {
  return (
    <div className="flex-container w-equal-3">
      <label>Okres kredytowania</label>
      <div>
        <span>
          <BiMinus onClick={() => onPeriodChange(rounder(value - 1))} />
        </span>
        <input
          type="number"
          min="1"
          step="1"
          value={value}
          onChange={(event) => onPeriodChange(parseFloat(event.target.value))}
        />
        <span>
          <BiPlus onClick={() => onPeriodChange(rounder(value + 1))} />
        </span>
      </div>
      <span>miesięcy</span>
    </div>
  );
};
