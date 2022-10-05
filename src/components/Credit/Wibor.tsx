import { BiPlus, BiMinus } from "react-icons/bi";
import { rounder } from "../../Utils/Helpers";
import React from 'react';

export const Wibor = ({ value, onWiborChange } : {value: number, onWiborChange: (value: number) => void}) => {
  return (
    <div>
      <label>WIBOR</label>
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
      <span>%</span>
    </div>
  );
};
