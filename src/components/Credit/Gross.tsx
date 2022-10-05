import { BiPlus, BiMinus } from "react-icons/bi";
import { rounder } from "../../Utils/Helpers";
import React from 'react';

export const Gross = ({ value, onGrossChange } : { value: number, onGrossChange: (value: number) => void}) => {
  return (
    <div>
      <label>Marża banku</label>
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
      <span>%</span>
    </div>
  );
};
