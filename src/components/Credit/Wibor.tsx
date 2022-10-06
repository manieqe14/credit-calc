import { BiPlus, BiMinus } from 'react-icons/bi';
import { rounder } from '../../Utils/Helpers';
import React, { ReactElement } from 'react';

export const Wibor = ({
  value,
  onWiborChange,
}: {
  value: number;
  onWiborChange: (value: number) => void;
}): ReactElement => {
  return (
    <div className="flex-container w-equal-3">
      <label>WIBOR</label>
      <div>
        <span>
          <BiMinus onClick={() => onWiborChange(rounder(value - 0.1))} />
        </span>
        <input
          type="number"
          min="0"
          step="0.01"
          value={value}
          onChange={(event) => onWiborChange(parseFloat(event.target.value))}
        />
        <span>
          <BiPlus onClick={() => onWiborChange(rounder(value + 0.1))} />
        </span>
      </div>
      <span>%</span>
    </div>
  );
};
